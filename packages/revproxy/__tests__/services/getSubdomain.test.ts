import { expect } from "chai"
import { stub } from "sinon"
import { Retrievable } from "@beatrice/common"
import getSubdomain from "../../src/services/getSubdomain"
import { Subdomain } from "../../src/types"

describe("getSubdomain", () => {
	const testSubdomain = {
		id: "test-id",
		domain: "test-domain",
		url: "test-url",
		certificateId: "test-cert"
	}
	const repository: Retrievable<Subdomain> = {
		get: async () => testSubdomain
	}

	it("should call query function with a blank query", async () => {
		const fn = stub(repository, "get")
		await getSubdomain(repository, "test-id")
		expect(fn.calledOnceWith("test-id")).to.be.true
	})
})