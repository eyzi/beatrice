import { expect } from "chai";
import { createSandbox, SinonSandbox, stub } from "sinon";
import { Retrievable } from "@beatrice/common";
import getFeature from "../../src/services/getFeature";
import { Feature } from "../../src/types";

describe("getFeature", () => {
  const mockRepoData = [
    {
      id: "test-id-1",
      key: "test-key-1",
      value: "test-value-1"
    },
    {
      id: "test-id-2",
      key: "test-key-2",
      value: "test-value-2"
    }
  ];

  const mockRepo: Retrievable<Feature> = {
    get: async (id: string) => mockRepoData.find((x) => x.key === id) ?? null
  }

  let sandbox: SinonSandbox;
  beforeEach(() => {sandbox = createSandbox()});
  afterEach(() => {sandbox.restore()});

  it("should return null if not found", async () => {
    const fn = sandbox.spy(mockRepo, "get");
    const item = await getFeature(mockRepo, "test-key-3");
    expect(fn.calledOnceWith("test-key-3")).to.be.true;
    expect(item).to.be.null;
  });

  it("should call get function with a key", async () => {
    const fn = sandbox.spy(mockRepo, "get");
    const item = await getFeature(mockRepo, "test-key-2");
    expect(fn.calledOnceWith("test-key-2")).to.be.true;
    expect(item?.value).to.eql("test-value-2")
  });

  it("should be case insensitive", async () => {
    const fn = sandbox.spy(mockRepo, "get");
    const item = await getFeature(mockRepo, "TEST-KEY-1");
    expect(fn.calledOnceWith("test-key-1")).to.be.true;
    expect(item?.value).to.eql("test-value-1")
  });
});
