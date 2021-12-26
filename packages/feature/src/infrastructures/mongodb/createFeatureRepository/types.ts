import { Document } from "mongoose";

export type FeatureDocument = Document & {
  _id: string;
  key: string;
  value: any;
};
