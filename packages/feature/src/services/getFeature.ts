import { persistenceGet, Retrievable } from "@beatrice/common";
import { Feature } from "../types";

export default async (
  subdomainRepository: Retrievable<Feature>,
  key: string
): Promise<Feature | null> => persistenceGet(subdomainRepository)(key);
