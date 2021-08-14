import { expect } from "chai"
import { stub } from "sinon"
import stopSubdomain from "../../src/services/stopSubdomain"
import { SubdomainController } from "../../src/types"

describe("stopSubdomain", () => {
	const testSubdomain = {
		id: "test-id",
		domain: "test-domain",
		url: "test-url",
		certificateId: "test-cert"
	}
	const controller: SubdomainController = {
		start: async () => testSubdomain,
		stop: async () => testSubdomain
	}

	it("should call stop function", async () => {
		const fn = stub(controller, "stop")
		await stopSubdomain(controller)(testSubdomain)
		expect(fn.calledOnceWith(testSubdomain)).to.be.true
	})
})