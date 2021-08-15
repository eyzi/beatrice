import express, { Request, Response } from "express"
import {
	Repository
} from "@beatrice/common"
import {
	Record,
	RecordQuery
} from "../types";
import queryRecord from "../services/queryRecord"
import createRecord from "../services/createRecord"
import getRecord from "../services/getRecord"
import updateRecord from "../services/updateRecord"
import deleteRecord from "../services/deleteRecord"

const serverError = (res: Response) => res.status(500).end()

const handleQueryRecord = (
	repository?: Repository<Record, RecordQuery>
) => async (
	req: Request,
	res: Response
) => {
	if (!repository) return serverError(res)
	if (Object.keys(req.query).length > 0) {
		const record = await queryRecord(repository, req.query as RecordQuery);
		res.json(record);
	} else {
		res.end("pong");
	}
}

const handleCreateRecord = (
	repository?: Repository<Record, RecordQuery>
) => async (
	req: Request,
	res: Response
) => {
	if (!repository) return serverError(res)
	const record = await createRecord(repository, req.body);
	if (record) return res.status(200).json(record)
	else return res.status(422).end("Could not create DNS record")
}

const handleGetRecord = (
	repository?: Repository<Record, RecordQuery>
) => async (
	req: Request,
	res: Response
) => {
	if (!repository) return serverError(res)
	const record = await getRecord(repository, req.params.id);
	if (record) return res.status(200).json(record)
	else return res.status(404).end("DNS record not found")
}

const handleUpdateRecord = (
	repository?: Repository<Record, RecordQuery>
) => async (
	req: Request,
	res: Response
) => {
	if (!repository) return serverError(res)
	const record = await updateRecord(repository, req.params.id, req.body);
	if (record) return res.status(200).json(record)
	else return res.status(422).end("Could not modify DNS record")
}

const handleDeleteRecord = (
	repository?: Repository<Record, RecordQuery>
) => async (
	req: Request,
	res: Response
) => {
	if (!repository) return serverError(res)
	const record = await deleteRecord(repository, req.params.id);
	if (record) return res.status(200).json(record)
	else return res.status(422).end("Could not delete DNS record")
}

export default async (
	port?: string,
	repository?: Repository<Record, RecordQuery>
) => {
	if (!port) return

	const app = express()
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	app.get("/", handleQueryRecord(repository))
	app.post("/", handleCreateRecord(repository))
	app.get("/:id", handleGetRecord(repository))
	app.patch("/:id", handleUpdateRecord(repository))
	app.delete("/:id", handleDeleteRecord(repository))

	app.listen(+port, "0.0.0.0", () => {
		console.log(`API Service running at ${port}`);
	})
}