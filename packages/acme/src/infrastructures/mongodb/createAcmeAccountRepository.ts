import { Connection, Schema, Types, ObjectId } from "mongoose"
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
	buildAcmeAccount,
	buildAcmeAccountOrNull
} from "./map"

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
	db: Connection,
	collectionName: string
) => async (
	id: Id
) => {
	if (!Types.ObjectId.isValid(id)) return null

	const AcmeModel = db.model<AcmeAccountDocument>(collectionName, AcmeSchema)
	return AcmeModel.findById(id).then(buildAcmeAccountOrNull)
}

const initGetAll = (
	db: Connection,
	collectionName: string
) => async () => {
	const AcmeModel = db.model<AcmeAccountDocument>(collectionName, AcmeSchema)
	return AcmeModel.find({}).then((accounts: AcmeAccountDocument[]) => accounts.map(buildAcmeAccount))
}

const initUpdate = (
	db: Connection,
	collectionName: string
) => async (
	entity: AcmeAccount | Id,
	body: Partial<AcmeAccount>
): Promise<AcmeAccount | null> => {
	const id = getEntityId(entity)
	if (!Types.ObjectId.isValid(id)) return null

	const AcmeModel = db.model<AcmeAccountDocument>(collectionName, AcmeSchema)
	return AcmeModel.findByIdAndUpdate(
		id,
		{ $set: body },
		{ new: true }
	).then(buildAcmeAccountOrNull)
}

export default (
	collectionName: string
) => (
	db: Connection
): AcmeAccountRepository => ({
	get: initGet(db, collectionName),
	getAll: initGetAll(db, collectionName),
	update: initUpdate(db, collectionName)
})