import {
	Record,
	RecordRepository
} from "../types"

export default async (
	id: string,
	body: Partial<Record>,
	recordRepository: RecordRepository
): Promise<Record | null> => await recordRepository.update(id, body)