import { OmitId, Creatable, persistenceCreate } from "@beatrice/common";
import { Record } from "../types";

const lowercaseName = async (record: OmitId<Record>) => ({
  ...record,
  name: record.name.toLocaleLowerCase(),
});

export default async (
  recordRepository: Creatable<Record>,
  record: OmitId<Record>
): Promise<Record | null> =>
  lowercaseName(record).then(persistenceCreate(recordRepository));
