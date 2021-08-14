import createRedbirdApp from "../infrastructures/redbird/createSubdomainController"
import getSubdomains from "../services/getSubdomains"
import startSubdomains from "../services/startSubdomains"
import { SubdomainController, SubdomainRepository } from "../types"
import createDB from "./createDB"
import startExpress from "./startExpress"

const initializeSavedSubdomains = async (
	repository: SubdomainRepository,
	controller: SubdomainController
) => repository ? getSubdomains(repository).then(startSubdomains(controller)) : undefined

export default async ({
	apiPort,
	httpPort,
	httpsPort,
	certDir,
	dbString
}: any) => {
	if (!httpPort || !httpsPort) throw new Error("HTTP and HTTPS ports required!")

	const controller = createRedbirdApp({
		httpPort,
		httpsPort,
		useHttp2: false,
		logName: "@beatrice/revproxy",
		isVerbose: true,
		certDir
	})

	const repository = await createDB(dbString)
	if (repository) initializeSavedSubdomains(repository, controller)
	else console.log("DB could not be started")

	startExpress(apiPort, repository, controller)
}