import express, { Request, Response } from "express";
import { serveHealth } from "@beatrice/common";
import getFeature from "../services/getFeature";
import { FeatureRepository } from "../types";

const serverError = (res: Response) => res.status(500).end();

const getFeatureFlag =
  (repository?: FeatureRepository) => async (req: Request, res: Response) => {
    if (!repository) return serverError(res);
    const feature = await getFeature(repository, req.params.key);
    return feature ? res.status(200).end(feature.value) : res.status(400).end();
  };

export default async (port?: string, repository?: FeatureRepository) => {
  if (!port) return;

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  serveHealth(app);

  app.get("/:key", getFeatureFlag(repository));

  app.listen(+port, "0.0.0.0", () => {
    console.log(`API Service running at ${port}`);
  });
};
