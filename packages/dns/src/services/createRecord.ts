import {
	Record,
	RecordRepository
} from "../types"

export default async (
	record: Omit<Record, "id">,
	recordRepository: RecordRepository
): Promise<Record | null> => await recordRepository.create(record)