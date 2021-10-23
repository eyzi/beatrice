import {
  Id,
  Certificate,
  Updatable,
  SSL,
  Retrievable,
  Generator,
  Parser,
} from "@beatrice/common";
import { RetrievableAll } from "@beatrice/common/src";

export type CertificateGenerator = Generator<AcmeAccount, SSL>;
export type CertificateParser = Parser<string, Certificate>;
export type KeyGenerator = Generator<any, any>;
export type AcmeAccountRepository = Retrievable<AcmeAccount> &
  RetrievableAll<AcmeAccount> &
  Updatable<AcmeAccount>;

export type CertificateRenewer = {
  acmeAccount: AcmeAccount;
  certificateGenerator: CertificateGenerator;
  certificateParser: CertificateParser;
  certificateRepository: Updatable<SSL> & Retrievable<SSL>;
  acmeAccountRepository: Updatable<AcmeAccount> & Retrievable<AcmeAccount>;
  createKeyGenerator: KeyGenerator;
  renewalListeners?: Function[];
  marginDays?: number;
  force?: boolean;
};

export type AcmeAccount = SSL & {
  id: Id;
  key: any;
  email: string;
  domains: string[];
};

export type ChallengePluginParameter = {
  request?: any;
  dnsHosts?: any;
  challenge?: {
    identifier: {
      value: string;
    };
    dnsAuthorization: string;
    dnsHost: string;
    dnsPrefix: string;
    dnsZone: string;
  };
};

export type CertificateRenewerReturn = AcmeAccount & {
  renewed: boolean;
  message?: string;
};
