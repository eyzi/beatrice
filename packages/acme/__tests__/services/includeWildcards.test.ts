import { expect } from "chai"
import includeWildcards from "../../src/services/includeWildcards"

describe("includeWildcards", () => {
	it("should return included wildcards", () => {
		const domains = ["one.com", "two.com"]
		expect(includeWildcards(domains)).to.eql([
			"one.com",
			"*.one.com",
			"two.com",
			"*.two.com"
		])
	})
})