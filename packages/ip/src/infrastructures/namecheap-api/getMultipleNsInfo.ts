import { getNsInfo } from ".";
import { NamecheapApiConfig } from "./types";

const getMultipleNsInfo =
  (apiConfig: NamecheapApiConfig) =>
  (sld: string, tld: string) =>
  async (nameservers: string[]) =>
    Promise.all(nameservers.map(getNsInfo(apiConfig)(sld, tld)));

export default getMultipleNsInfo;
