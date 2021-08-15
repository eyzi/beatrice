import {
	OmitId,
	Creatable,
	persistenceCreate
} from "@beatrice/common"
import {
	Record
} from "../types"

export default async (
	recordRepository: Creatable<Record>,
	record: OmitId<Record>
): Promise<Record | null> => persistenceCreate(recordRepository)(record)