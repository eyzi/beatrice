import {
	persistenceGet,
	persistenceUpdate,
	SSL
} from "@beatrice/common"
import {
	AcmeAccount,
	CertificateRenewer,
	CertificateRenewerReturn
} from "../types"
import parseCertificate from "./parseCertificate"
import generateCertificate from "./generateCertificate"
import isDue from "./isDue"
import daysFromDate from "./daysFromDate"

export default async ({
	acmeAccount,
	certificateGenerator,
	certificateParser,
	certificateRepository,
	acmeAccountRepository,
	renewalListeners,
	marginDays = 30,
	force = false
}: CertificateRenewer): Promise<CertificateRenewerReturn> => {
	const ssl: SSL | null = await persistenceGet(certificateRepository)(acmeAccount.id)
	const certificate = await parseCertificate(certificateParser)(ssl?.certificate)

	if (certificate && isDue(certificate, daysFromDate(marginDays)) && !force)
		return { ...acmeAccount, renewed: false, message: "Certificate is not due" }

	let newSSL: SSL | null
	try {
		newSSL = await generateCertificate(certificateGenerator)(acmeAccount)
	} catch (error) {
		return { ...acmeAccount, renewed: false, message: error.toString() }
	}
	if (!newSSL) return { ...acmeAccount, renewed: false, message: "Certificate generator failed" }

	console.log(`Renewed certificate for domains ${acmeAccount.domains.toString()}`);

	const newAcmeAccount: AcmeAccount = { ...acmeAccount, ...newSSL }

	const { id, ...acmeAccountBody } = newAcmeAccount
	await persistenceUpdate(certificateRepository)(id, newSSL)
	await persistenceUpdate(acmeAccountRepository)(id, acmeAccountBody)

	renewalListeners?.forEach(listener => listener(newAcmeAccount.id))
	return { ...newAcmeAccount, renewed: true }
}