import { v4 } from "public-ip";
import { NamecheapApiConfig, NameserverInfo } from "./types";
import { callApi, extractCommandResponse, getDomainLevels } from "./utils";

const COMMAND = "namecheap.domains.ns.update";

const DomainNSUpdateResult =
  (domain: string, nameserver: string) => (commandResponse: any) => {
    return (
      commandResponse.DomainNSUpdateResult.find(
        (d: any) => d.$.Domain === domain && d.$.Nameserver === nameserver
      )?.$.IsSuccess === "true"
    );
  };

const getDnsList =
  (namecheapApiConfig: NamecheapApiConfig) =>
  (domain: string, newIp: string) =>
  async (nameserver: NameserverInfo) => {
    const [sld, tld] = getDomainLevels(domain);
    return callApi(`https://${namecheapApiConfig.baseUrl}`, {
      Command: COMMAND,
      ApiUser: namecheapApiConfig.username,
      UserName: namecheapApiConfig.username,
      ApiKey: namecheapApiConfig.apiKey,
      ClientIP: await v4(),
      SLD: sld,
      TLD: tld,
      Nameserver: nameserver.nameserver,
      OldIP: nameserver.ip,
      IP: newIp,
    })
      .then(extractCommandResponse(COMMAND))
      .then(DomainNSUpdateResult(domain, nameserver.nameserver));
  };

export default getDnsList;
