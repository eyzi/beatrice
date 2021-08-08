import {
	Record,
	RecordQuery,
	RecordRepository
} from "../types"

export default async (
	query: RecordQuery,
	recordRepository: RecordRepository
): Promise<Record[]> => await recordRepository.query(query)