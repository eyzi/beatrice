import { expect } from "chai"
import buildAnswerQuery from "../../src/services/buildAnswerQuery"

describe("buildAnswerQuery", () => {
	it("builds answer query", () => {
		expect(buildAnswerQuery("eyzi.dev", "TXT")).to.eql({ type: "TXT", name: ["eyzi.dev"]})
		expect(buildAnswerQuery("test.eyzi.dev", "TXT")).to.eql({ type: "TXT", name: ["test.eyzi.dev", "*.eyzi.dev"]})
	})
})