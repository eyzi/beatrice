import { Repository, createMongoRepository } from "@beatrice/common"
import mongoRecordRepository from "../infrastructures/mongodb/mongoRecordRepository"
import startDnsd from "./startDnsd"
import startExpress from "./startExpress"
import { Record, RecordQuery } from "../types";

export default async ({
	appPort,
	apiPort,
	dbString
}: any) => {
	if (!appPort) throw new Error("App port required!")

	const repository = await createMongoRepository<Repository<Record, RecordQuery>>(dbString, mongoRecordRepository)
	if (!repository) console.log("DB could not be started")

	startDnsd(appPort, repository)
	startExpress(apiPort, repository)
}