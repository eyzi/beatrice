import {
	Queryable
} from "@beatrice/common"
import {
	Domain,
	Record,
	RecordType,
	RecordQuery
} from "../types"
import buildAnswerQuery from "./buildAnswerQuery"
import queryRecord from "./queryRecord"

export default async (
	recordRepository: Queryable<Record, RecordQuery>,
	name: Domain,
	type: RecordType
): Promise<Record[]> => queryRecord(recordRepository, buildAnswerQuery(name, type))