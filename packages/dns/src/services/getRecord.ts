import {
	Id,
	Retrievable,
	persistenceGet
} from "@beatrice/common"
import {
	Record
} from "../types"

export default async (
	recordRepository: Retrievable<Record>,
	id: Id
): Promise<Record | null> => persistenceGet(recordRepository, id)