import { createMongoRepository } from "@beatrice/common";
import createFeatureRepository from "../infrastructures/mongodb/createFeatureRepository";
import { FeatureRepository } from "../types";
import startApi from "./startApi";

export default async ({ apiPort, dbString }: any) => {
  const repository = await createMongoRepository<FeatureRepository>(
    dbString,
    createFeatureRepository
  );
  startApi(apiPort, repository);
};
