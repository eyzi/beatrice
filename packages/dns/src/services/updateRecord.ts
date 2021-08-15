import {
	Id,
	Updatable,
	persistenceUpdate
} from "@beatrice/common"
import {
	Record
} from "../types"

export default async (
	recordRepository: Updatable<Record>,
	record: Record | Id,
	body: Partial<Record>
): Promise<Record | null> => persistenceUpdate(recordRepository)(record, body)