import { v4 } from "public-ip";
import { NamecheapApiConfig, NameserverInfo } from "./types";
import { callApi, extractCommandResponse } from "./utils";

const COMMAND = "namecheap.domains.ns.getInfo";

const getDomainNSInfoResult =
  (domain: string, nameserver: string) =>
  (commandResponse: any): NameserverInfo => {
    const nsInfo = commandResponse.DomainNSInfoResult.find(
      (d: any) => d.$.Domain === domain && d.$.Nameserver === nameserver
    );
    return {
      nameserver: nsInfo.$.Nameserver,
      ip: nsInfo.$.IP,
    };
  };

const getDnsList =
  (namecheapApiConfig: NamecheapApiConfig) =>
  (sld: string, tld: string) =>
  async (nameserver: string) => {
    return callApi(`https://${namecheapApiConfig.baseUrl}`, {
      Command: COMMAND,
      ApiUser: namecheapApiConfig.username,
      UserName: namecheapApiConfig.username,
      ApiKey: namecheapApiConfig.apiKey,
      ClientIP: await v4(),
      SLD: sld,
      TLD: tld,
      Nameserver: nameserver,
    })
      .then(extractCommandResponse(COMMAND))
      .then(getDomainNSInfoResult(`${sld}.${tld}`, nameserver));
  };

export default getDnsList;
