import { Record } from "../../../types"
import { RecordDocument } from "./types"

export const buildRecord = (
	doc: RecordDocument
): Record => ({
	id: doc._id,
	name: doc.name,
	type: doc.type,
	data: doc.data,
	ttl: doc.ttl
})

export const buildRecordOrNull = (
	doc: RecordDocument | null
): Record | null => doc ? buildRecord(doc) : null