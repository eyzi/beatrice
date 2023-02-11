import { Domain, RecordType } from "../types"

export default (
	name: Domain | Domain[],
	type: RecordType
) => ({
	type,
	name,
})