import express, { Request, Response } from "express";
import { serveHealth } from "@beatrice/common";
import { SubdomainController, SubdomainRepository } from "../types";
import getSubdomainsByCertificate from "../services/getSubdomainsByCertificate";
import restartSubdomain from "../services/restartSubdomain";

const serverError = (res: Response) => res.status(500).end();

const handleRestartCertificate =
  (repository?: SubdomainRepository, controller?: SubdomainController) =>
  async (req: Request, res: Response) => {
    if (!repository || !controller) return serverError(res);
    const subdomains = await getSubdomainsByCertificate(
      repository,
      req.params.id
    ).then((subdomains) => subdomains.map(restartSubdomain(controller)));
    return subdomains && subdomains.length > 0
      ? res.status(201).end()
      : res.status(400).end();
  };

export default async (
  port?: string,
  repository?: SubdomainRepository,
  controller?: SubdomainController
) => {
  if (!port) return;

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  serveHealth(app);

  app.post("/restart/:id", handleRestartCertificate(repository, controller));

  app.listen(+port, "0.0.0.0", () => {
    console.log(`API Service running at ${port}`);
  });
};
