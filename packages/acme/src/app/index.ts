import { createMongoRepository } from "@beatrice/common"
import createCertificateGenerator from "../infrastructures/acme/createCertificateGenerator"
import createApiListener from "../infrastructures/beatrice-revproxy/createApiListener"
import createCertificateRepository from "../infrastructures/fs/createCertificateRepository"
import createAcmeAccountRepository from "../infrastructures/mongodb/createAcmeAccountRepository"
import createChallengePlugin from "../infrastructures/beatrice-dns/createChallengePlugin"
import createCertificateParser from "../infrastructures/x509/createCertificateParser"
import { AcmeAccount, AcmeAccountRepository, CertificateRenewer } from "../types"
import createScheduler from "./createScheduler"
import startApi from "./startApi"
import renewCertificate from "../services/renewCertificate"

const renewerCreator = ({
	certificateGenerator,
	certificateParser,
	certificateRepository,
	acmeAccountRepository,
	renewalListeners
}: Omit<CertificateRenewer, "acmeAccount" | "force">) => async (
	acmeAccount: AcmeAccount,
	force: boolean = false
) => renewCertificate({
	certificateGenerator,
	certificateParser,
	certificateRepository,
	acmeAccountRepository,
	renewalListeners,
	acmeAccount,
	force
})

const PROPAGATION_DELAY = 5000

export default async ({
	apiPort,
	staging,
	certDir,
	dbString,
	challengeUrl,
	listenerUrl,
	marginDays,
	schedule
}: any) => {
	if (!dbString) return

	const challenge = {
		"dns-01": createChallengePlugin(challengeUrl, PROPAGATION_DELAY)
	}
	
	const accountDBName = staging ? "acme-staging" : "acme"

	const generator = createCertificateGenerator(challenge, staging)
	const parser = createCertificateParser()
	const certRepository = createCertificateRepository(certDir)
	const acmeAccountRepository = await createMongoRepository<AcmeAccountRepository>(dbString, createAcmeAccountRepository(accountDBName))
	const listener = createApiListener(listenerUrl)

	const createRenewer = renewerCreator({
		certificateGenerator: generator,
		certificateParser: parser,
		certificateRepository: certRepository,
		acmeAccountRepository,
		renewalListeners: [listener],
		marginDays
	})

	createScheduler(schedule, createRenewer, acmeAccountRepository)
	startApi(apiPort, createRenewer, acmeAccountRepository)
}