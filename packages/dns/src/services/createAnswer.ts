import {
	Domain,
	Record,
	RecordType,
	RecordRepository
} from "../types"
import createWildcards from "./createWildcards"
import queryRecord from "./queryRecord"

export default async (
	name: Domain,
	type: RecordType,
	recordRepository: RecordRepository
): Promise<Record[]> => {
	const query = {
		type,
		name: createWildcards(name)
	}
	return await queryRecord(query, recordRepository)
}