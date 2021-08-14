import { expect } from "chai"
import { stub } from "sinon"
import { Queryable } from "@beatrice/common"
import getSubdomainsByCertificate from "../../src/services/getSubdomainsByCertificate"
import { Subdomain, SubdomainQuery } from "../../src/types"

describe("getSubdomainsByCertificate", () => {
	const repository: Queryable<Subdomain, SubdomainQuery> = {
		query: async () => []
	}

	it("should call query function with a certificateId query", async () => {
		const fn = stub(repository, "query")
		await getSubdomainsByCertificate(repository, "test-cert-id")
		expect(fn.calledOnceWith({ certificateId: "test-cert-id" })).to.be.true
	})
})