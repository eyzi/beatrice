import { updateNsIp } from ".";
import { NamecheapApiConfig, NameserverInfo } from "./types";

const updateMultipleNsIp =
  (apiConfig: NamecheapApiConfig) =>
  (domain: string, newIp: string) =>
  async (nameservers: NameserverInfo[]) =>
    Promise.all(nameservers.map(updateNsIp(apiConfig)(domain, newIp)));

export default updateMultipleNsIp;
