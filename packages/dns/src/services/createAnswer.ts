import { Queryable } from "@beatrice/common";
import { Domain, Record, RecordType, RecordQuery } from "../types";
import buildAnswerQuery from "./buildAnswerQuery";
import createWildcards from "./createWildcards";
import queryRecord from "./queryRecord";

export default async (
  recordRepository: Queryable<Record, RecordQuery>,
  name: Domain,
  type: RecordType
): Promise<Record[]> => {
  const [exactQuery, wildcardQuery] = await Promise.all([
    queryRecord(
      recordRepository,
      buildAnswerQuery(name.toLocaleLowerCase(), type)
    ),
    queryRecord(
      recordRepository,
      buildAnswerQuery(createWildcards(name.toLocaleLowerCase()), type)
    )
  ]);

  return exactQuery.length > 0 ? exactQuery : wildcardQuery;
};
