import {
	Queryable,
	persistenceQuery
} from "@beatrice/common"
import {
	Record,
	RecordQuery
} from "../types"

export default async (
	recordRepository: Queryable<Record, RecordQuery>,
	query: RecordQuery
): Promise<Record[]> => persistenceQuery(recordRepository)(query)