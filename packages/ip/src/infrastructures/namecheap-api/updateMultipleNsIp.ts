import { updateNsIp } from ".";
import { NamecheapApiConfig, NameserverInfo } from "./types";

const updateMultipleNsIp =
  (apiConfig: NamecheapApiConfig) =>
  (sld: string, tld: string, newIp: string) =>
  async (nameservers: NameserverInfo[]) =>
    Promise.all(nameservers.map(updateNsIp(apiConfig)(sld, tld, newIp)));

export default updateMultipleNsIp;
