import express, { Request, Response } from "express";
import { Retrievable, persistenceGet, serveHealth } from "@beatrice/common";
import { AcmeAccount, CertificateRenewerReturn } from "../types";

const serverError = (res: Response) => res.status(500).end();

const handleRenewCertificate =
  (
    renewer: (
      account: AcmeAccount,
      force: boolean
    ) => Promise<CertificateRenewerReturn>,
    accountRepository: Retrievable<AcmeAccount>
  ) =>
  async (req: Request, res: Response) => {
    if (!accountRepository || !renewer) return serverError(res);

    const acmeAccount = await persistenceGet(accountRepository)(req.params.id);
    if (!acmeAccount) return res.status(404).end();

    const { renewed, message } = await renewer(
      acmeAccount,
      req.query.force === "true"
    );
    return renewed === true
      ? res.status(201).end()
      : res.status(422).end(message);
  };

export default async (
  port: string,
  renewer: (
    account: AcmeAccount,
    force: boolean
  ) => Promise<CertificateRenewerReturn>,
  accountRepository: Retrievable<AcmeAccount>
) => {
  if (!port) return;

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  serveHealth(app);

  app.post("/renew/:id", handleRenewCertificate(renewer, accountRepository));

  app.listen(+port, "0.0.0.0", () => {
    console.log(`API Service running at ${port}`);
  });
};
