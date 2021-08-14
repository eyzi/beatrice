import { expect } from "chai"
import { stub } from "sinon"
import startSubdomains from "../../src/services/startSubdomains"
import { SubdomainController } from "../../src/types"

describe("startSubdomain", () => {
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

	it("should call start function", async () => {
		const fn = stub(controller, "start")
		await startSubdomains(controller)([testSubdomain])
		expect(fn.calledOnceWith(testSubdomain)).to.be.true
	})
})