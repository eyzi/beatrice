import { Schema, Connection, Types } from "mongoose"
import {
	Id,
	OmitId,
	Repository
} from "@beatrice/common"
import { Record, RecordQuery } from "../../../types"
import { buildRecord, buildRecordOrNull } from "./map"
import { RecordDocument } from "./types"

const COLLECTION_NAME = "dns"
const DEFAULT_TTL = "3600"

const RecordSchema = new Schema({
	name: String,
	type: String,
	data: Schema.Types.Mixed,
	ttl: {
		type: String,
		default: DEFAULT_TTL
	}
}, { timestamps: true });

const initCreate = (
	db: Connection
) => async (
	body: OmitId<Record>
): Promise<Record> => {
	const RecordModel = db.model<RecordDocument>(COLLECTION_NAME, RecordSchema)
	return RecordModel.create(body).then(buildRecord)
}

const initGet = (
	db: Connection
) => async (
	id: Id
): Promise<Record | null> => {
	if (!Types.ObjectId.isValid(id)) return null
	const RecordModel = db.model<RecordDocument>(COLLECTION_NAME, RecordSchema)
	return RecordModel.findById(id).then(buildRecordOrNull)
}

const initGetAll = (
	db: Connection
) => async (): Promise<Record[]> => {
	const RecordModel = db.model<RecordDocument>(COLLECTION_NAME, RecordSchema)
	return RecordModel.find({})
		.then((docs: RecordDocument[]) => docs.map(buildRecord))
}

const initQuery = (
	db: Connection
) => async (
	recordQuery: RecordQuery
): Promise<Record[]> => {
	const query = {
		type: recordQuery.type,
		...(recordQuery.name
			? {
				$or: typeof recordQuery.name === "string"
					? [{ name: recordQuery.name }]
					: recordQuery.name.map(domain => ({ name: domain }))
			} : undefined)
	}

	const RecordModel = db.model<RecordDocument>(COLLECTION_NAME, RecordSchema)
	return RecordModel.find(query)
		.then((docs: RecordDocument[]) => docs.map(buildRecord))
}

const initUpdate = (
	db: Connection
) => async (
	entity: Record | Id,
	body: Partial<Record>
): Promise<Record | null> => {
	const id = typeof entity === "string" ? entity : entity.id
	if (!Types.ObjectId.isValid(id)) return null

	const RecordModel = db.model<RecordDocument>(COLLECTION_NAME, RecordSchema)
	return RecordModel.findByIdAndUpdate(
		id,
		{ $set: body },
		{ new: true }
	).then(buildRecordOrNull)
}

const initDelete = (
	db: Connection
) => async (
	entity: Record | Id
): Promise<boolean> => {
	const id = typeof entity === "string" ? entity : entity.id
	if (!Types.ObjectId.isValid(id)) return false

	const RecordModel = db.model<RecordDocument>(COLLECTION_NAME, RecordSchema)
	return RecordModel.findByIdAndDelete(id)
		.then(doc => !!doc)
}

export default (
	db: Connection
): Repository<Record, RecordQuery> => ({
	create: initCreate(db),
	get: initGet(db),
	getAll: initGetAll(db),
	query: initQuery(db),
	update: initUpdate(db),
	delete: initDelete(db),
})