import { expect } from "chai"
import { stub } from "sinon"
import { Queryable } from "@beatrice/common"
import getSubdomains from "../../src/services/getSubdomains"
import { Subdomain, SubdomainQuery } from "../../src/types"

describe("getSubdomains", () => {
	const repository: Queryable<Subdomain, SubdomainQuery> = {
		query: async () => []
	}

	it("should call query function with a blank query", async () => {
		const fn = stub(repository, "query")
		await getSubdomains(repository)
		expect(fn.calledOnceWith({})).to.be.true
	})
})