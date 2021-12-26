import { v4 } from "public-ip";
import { NamecheapApiConfig } from "./types";
import { callApi, extractCommandResponse, getDomainLevels } from "./utils";

const COMMAND = "namecheap.domains.dns.getList";

const getDomainDNSGetListResult =
  (domain: string) => (commandResponse: any) => {
    return commandResponse.DomainDNSGetListResult.find(
      (d: any) => d.$.Domain === domain
    ).Nameserver;
  };

const getDnsList =
  (namecheapApiConfig: NamecheapApiConfig) => async (domain: string) => {
    const [sld, tld] = getDomainLevels(domain);
    return callApi(`https://${namecheapApiConfig.baseUrl}`, {
      Command: COMMAND,
      ApiUser: namecheapApiConfig.username,
      UserName: namecheapApiConfig.username,
      ApiKey: namecheapApiConfig.apiKey,
      ClientIP: await v4(),
      SLD: sld,
      TLD: tld,
    })
      .then(extractCommandResponse(COMMAND))
      .then(getDomainDNSGetListResult(domain));
  };

export default getDnsList;
