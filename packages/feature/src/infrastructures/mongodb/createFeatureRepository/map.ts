import { Feature } from "../../../types";
import { FeatureDocument } from "./types";

export const buildFeature = (doc: FeatureDocument): Feature => ({
  id: doc._id.toString(),
  key: doc.key,
  value: doc.value,
});

export const buildFeatureOrNull = (
  doc: FeatureDocument | null
): Feature | null => (doc ? buildFeature(doc) : null);
