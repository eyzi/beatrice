import { Connection, Schema, Types } from "mongoose"
import {
	Id,
	getEntityId,
} from "@beatrice/common"
import {
	AcmeAccount,
	AcmeAccountRepository
} from "../../types"
import { AcmeAccountDocument } from "./types"
import {
	buildAcmeAccountOrNull
} from "./map"

const COLLECTION_NAME = "acmeAccount"

const AcmeSchema = new Schema({
	name: String,
	email: String,
	domains: [String],
	key: Schema.Types.Mixed,
	privateKey: {
		type: String,
		default: null
	},
	certificate: {
		type: String,
		default: null
	}
}, { timestamps: true });

const initGet = (
	db: Connection
) => async (
	id: Id
) => {
	if (!Types.ObjectId.isValid(id)) return null

	const AcmeModel = db.model<AcmeAccountDocument>(COLLECTION_NAME, AcmeSchema)
	return AcmeModel.findById(id).then(buildAcmeAccountOrNull)
}

const initUpdate = (
	db: Connection
) => async (
	entity: AcmeAccount | Id,
	body: Partial<AcmeAccount>
): Promise<AcmeAccount | null> => {
	const id = getEntityId(entity)
	if (!Types.ObjectId.isValid(id)) return null

	const AcmeModel = db.model<AcmeAccountDocument>(COLLECTION_NAME, AcmeSchema)
	return AcmeModel.findByIdAndUpdate(
		id,
		{ $set: body },
		{ new: true }
	).then(buildAcmeAccountOrNull)
}

export default (
	db: Connection
): AcmeAccountRepository => ({
	get: initGet(db),
	update: initUpdate(db)
})