import { v4 } from "public-ip";
import {
  getDnsList,
  getMultipleNsInfo,
  updateMultipleNsIp,
} from "../infrastructures/namecheap-api";
import { NamecheapApiConfig } from "../infrastructures/namecheap-api/types";

const syncNsIp = async (apiConfig: NamecheapApiConfig) => {
  const publicIp = await v4();
  return getDnsList(apiConfig)("moonlit", "works")
    .then(getMultipleNsInfo(apiConfig)("moonlit", "works"))
    .then((nameservers) => nameservers.filter((ns) => ns.ip !== publicIp))
    .then(updateMultipleNsIp(apiConfig)("moonlit", "works", publicIp));
};

export default syncNsIp;
