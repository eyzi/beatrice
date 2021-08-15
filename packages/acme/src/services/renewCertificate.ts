import {
	Certificate,
	persistenceGet,
	persistenceUpdate,
	SSL
} from "@beatrice/common"
import {
	AcmeAccount,
	CertificateRenewer
} from "../types"
import parseCertificate from "./parseCertificate"
import generateCertificate from "./generateCertificate"
import isDue from "./isDue"
import daysFromDate from "./daysFromDate"

const DAYS_AHEAD = 45

export default async ({
	acmeAccount,
	certificateGenerator,
	certificateParser,
	certificateRepository,
	acmeAccountRepository,
	renewalListeners,
	force = false
}: CertificateRenewer): Promise<AcmeAccount> => {
	const ssl: SSL | null = await persistenceGet(certificateRepository)(acmeAccount.id)
	const certificate = await parseCertificate(certificateParser)(ssl?.certificate)
	if (
		!certificate ||
		(isDue(certificate, daysFromDate(DAYS_AHEAD)) && !force)
	) return acmeAccount

	const newSSL: SSL | null = await generateCertificate(certificateGenerator)(acmeAccount)
	if (!newSSL) return acmeAccount

	const newAcmeAccount: AcmeAccount = { ...acmeAccount, ...newSSL }

	const { id, ...acmeAccountBody } = newAcmeAccount
	await persistenceUpdate(certificateRepository)(id, newSSL)
	await persistenceUpdate(acmeAccountRepository)(id, acmeAccountBody)

	renewalListeners?.forEach(listener => listener(newAcmeAccount))

	return newAcmeAccount
}