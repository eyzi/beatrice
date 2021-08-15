import {
	Id,
	Deletable,
	persistenceDelete
} from "@beatrice/common"
import {
	Record
} from "../types"

export default async (
	recordRepository: Deletable<Record>,
	record: Record | Id
): Promise<boolean> => persistenceDelete(recordRepository)(record)