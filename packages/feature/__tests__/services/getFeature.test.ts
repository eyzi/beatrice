import { expect } from "chai";
import { stub } from "sinon";
import { Retrievable } from "@beatrice/common";
import getFeature from "../../src/services/getFeature";
import { Feature } from "../../src/types";

describe("getFeature", () => {
  const repository: Retrievable<Feature> = {
    get: async (key: string) => ({
      id: "test-id",
      key,
      value: "test-value",
    }),
  };

  it("should call get function with a key", async () => {
    const fn = stub(repository, "get");
    await getFeature(repository, "test-key");
    expect(fn.calledOnceWith("test-key")).to.be.true;
  });
});
