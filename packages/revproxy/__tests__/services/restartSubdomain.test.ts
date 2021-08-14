import { expect } from "chai"
import {
	SinonSandbox,
	createSandbox,
	stub,
	SinonStub
} from "sinon"
import restartSubdomain from "../../src/services/restartSubdomain"
import { SubdomainController } from "../../src/types"

describe("restartSubdomain", () => {
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
	
	let sandbox: SinonSandbox,
		fnStart: SinonStub,
		fnStop: SinonStub

	beforeEach(() => {
		sandbox = createSandbox()
		fnStart = sandbox.stub(controller, "start")
		fnStop = sandbox.stub(controller, "stop")
	})
	afterEach(() => { sandbox.restore() })

	it("should call start and stop functions if subdomain is valid", async () => {
		await restartSubdomain(controller)(testSubdomain)
		expect(fnStart.calledOnceWith(testSubdomain)).to.be.true
		expect(fnStop.calledOnceWith(testSubdomain)).to.be.true
	})

	it("should not call start and stop functions if subdomain is null", async () => {
		await restartSubdomain(controller)(null)
		expect(fnStart.calledOnce).to.be.false
		expect(fnStop.calledOnce).to.be.false
	})
})