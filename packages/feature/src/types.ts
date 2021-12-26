import { Id, Retrievable } from "@beatrice/common";

export type Feature = {
  id: Id;
  key: string;
  value: any;
};

export type FeatureRepository = Retrievable<Feature>;
