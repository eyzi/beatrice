import { v4 } from "public-ip";
import {
  getDnsList,
  getMultipleNsInfo,
  updateMultipleNsIp,
} from "../infrastructures/namecheap-api";
import { NamecheapApiConfig } from "../infrastructures/namecheap-api/types";

const syncNsIp = async (apiConfig: NamecheapApiConfig, domain: string) => {
  const publicIp = await v4();
  return getDnsList(apiConfig)(domain)
    .then(getMultipleNsInfo(apiConfig)(domain))
    .then((nameservers) => nameservers.filter((ns) => ns.ip !== publicIp))
    .then((nameservers) => {
      if (nameservers.length > 0) {
        console.log(
          `Syncing nameservers: ${nameservers
            .map((ns) => ns.nameserver)
            .join(", ")}`
        );
      } else {
        console.log(`No nameserver to sync`);
      }
      return nameservers;
    })
    .then(updateMultipleNsIp(apiConfig)(domain, publicIp));
};

export default syncNsIp;
