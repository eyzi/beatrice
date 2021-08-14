import createDB from "./createDB"
import startDnsd from "./startDnsd"
import startExpress from "./startExpress"

export default async ({
	appPort,
	apiPort,
	dbString
}: any) => {
	if (!appPort) throw new Error("App port required!")

	const repository = await createDB(dbString)
	if (!repository) console.log("DB could not be started")

	startDnsd(appPort, repository)
	startExpress(apiPort, repository)
}