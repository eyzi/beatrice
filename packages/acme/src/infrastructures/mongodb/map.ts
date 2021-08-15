import {
	AcmeAccount
} from "../../types"
import {
	AcmeAccountDocument
} from "./types"

export const buildAcmeAccount = (
	doc: AcmeAccountDocument
): AcmeAccount => ({
	id: doc._id.toString(),
	key: doc.key,
	email: doc.email,
	domains: doc.domains,
	privateKey: doc.privateKey,
	certificate: doc.certificate
})

export const buildAcmeAccountOrNull = (
	doc: AcmeAccountDocument | null
) => doc ? buildAcmeAccount(doc) : null