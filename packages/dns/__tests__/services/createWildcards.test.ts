import { expect } from "chai"
import createWildcards from "../../src/services/createWildcards"

describe("createWildcards", () => {
	it("should return wildcards for (n>2)th-level domains", () => {
		expect(createWildcards("eyzi.dev")).to.eql(["eyzi.dev"])
	})

	it("should not return wildcard for second-level domains", () => {
		expect(createWildcards("test.eyzi.dev")).to.eql(["test.eyzi.dev", "*.eyzi.dev"])
		expect(createWildcards("a.test.eyzi.dev")).to.eql(["a.test.eyzi.dev", "*.test.eyzi.dev"])
	})
})