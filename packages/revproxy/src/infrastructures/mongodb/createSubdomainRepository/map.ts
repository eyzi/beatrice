import { Subdomain } from "../../../types"
import { SubdomainDocument } from "./types"

export const buildSubdomain = (
	doc: SubdomainDocument
): Subdomain => ({
	id: doc._id.toString(),
	domain: doc.domain,
	url: doc.url,
	certificateId: doc.certificateId
})

export const buildSubdomainOrNull = (
	doc: SubdomainDocument | null
): Subdomain | null => doc ? buildSubdomain(doc) : null