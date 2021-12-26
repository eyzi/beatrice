import { getNsInfo } from ".";
import { NamecheapApiConfig } from "./types";

const getMultipleNsInfo =
  (apiConfig: NamecheapApiConfig) =>
  (domain: string) =>
  async (nameservers: string[]) =>
    Promise.all(nameservers.map(getNsInfo(apiConfig)(domain)));

export default getMultipleNsInfo;
