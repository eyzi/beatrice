import { Domain, RecordType } from "../types"
import createWildcards from "./createWildcards"

export default (
	name: Domain,
	type: RecordType
) => ({
	type,
	name: createWildcards(name)
})