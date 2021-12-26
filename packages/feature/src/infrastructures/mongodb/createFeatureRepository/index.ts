import { Connection, Schema } from "mongoose";
import { FeatureRepository, Feature } from "../../../types";
import { FeatureDocument } from "./types";
import { buildFeatureOrNull } from "./map";

const COLLECTION_NAME = "features";

const FeatureSchema = new Schema(
  {
    key: {
      type: String,
      unique: true,
      index: true,
    },
    value: Schema.Types.Mixed,
  },
  { timestamps: true }
);

const initGet =
  (db: Connection) =>
  async (key: string): Promise<Feature | null> => {
    const FeatureModel = db.model<FeatureDocument>(
      COLLECTION_NAME,
      FeatureSchema
    );
    return FeatureModel.findOne({ key }).then(buildFeatureOrNull);
  };

export default (db: Connection): FeatureRepository => ({
  get: initGet(db),
});
