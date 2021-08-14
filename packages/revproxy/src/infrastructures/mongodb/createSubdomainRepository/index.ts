import { Connection, Schema } from "mongoose"
import { Id } from "@beatrice/common"
import {
	Subdomain,
	SubdomainQuery,
	SubdomainRepository
} from "../../../types"
import {
	SubdomainDocument
} from "./types"
import {
	buildSubdomain,
	buildSubdomainOrNull
} from "./map"

const COLLECTION_NAME = "subdomain"

const SubdomainSchema = new Schema({
	domain: String,
	url: String,
	certificateId: String
}, { timestamps: true });

const initGet = (
	db: Connection
) => async (
	id: Id
): Promise<Subdomain | null> => {
	const SubdomainModel = db.model<SubdomainDocument>(COLLECTION_NAME, SubdomainSchema)
	return SubdomainModel.findById(id).then(buildSubdomainOrNull)
}

const initQuery = (
	db: Connection
) => async (
	query: SubdomainQuery
): Promise<Subdomain[]> => {
	const SubdomainModel = db.model<SubdomainDocument>(COLLECTION_NAME, SubdomainSchema)
	return SubdomainModel.find(query)
		.then((docs: SubdomainDocument[]) => docs.map(buildSubdomain))
}

export default (
	db: Connection
): SubdomainRepository => ({
	get: initGet(db),
	query: initQuery(db)
})