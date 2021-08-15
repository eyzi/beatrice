import { createMongoRepository } from "@beatrice/common"
import createRedbirdApp from "../infrastructures/redbird/createSubdomainController"
import createSubdomainRepository from "../infrastructures/mongodb/createSubdomainRepository"
import getSubdomains from "../services/getSubdomains"
import startSubdomains from "../services/startSubdomains"
import { SubdomainController, SubdomainRepository } from "../types"
import startApi from "./startApi"

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

	const repository = await createMongoRepository<SubdomainRepository>(dbString, createSubdomainRepository)
	if (repository) initializeSavedSubdomains(repository, controller)
	else console.log("DB could not be started")

	startApi(apiPort, repository, controller)
}