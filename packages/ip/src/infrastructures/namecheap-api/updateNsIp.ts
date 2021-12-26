import { v4 } from "public-ip";
import { NamecheapApiConfig, NameserverInfo } from "./types";
import { callApi, extractCommandResponse } from "./utils";

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
  (sld: string, tld: string, newIp: string) =>
  async (nameserver: NameserverInfo) => {
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
      .then(DomainNSUpdateResult(`${sld}.${tld}`, nameserver.nameserver));
  };

export default getDnsList;
