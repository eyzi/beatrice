import { expect } from "chai"
import { stub } from "sinon"

import { Deletable } from "@beatrice/common"

import { Record } from "../../src/types"
import deleteRecord from "../../src/services/deleteRecord"

describe("deleteRecord", () => {
	const testRecord: Record = {
		id: "test-id",
		name: "test-domain",
		type: "test-type",
		data: "test-data",
		ttl: "test-ttl"
	}
	const repository: Deletable<Record> = {
		delete: async () => true
	}

	it("should call delete function", async () => {
		const fn = stub(repository, "delete").resolves(true)
		expect(await deleteRecord(repository, testRecord)).to.be.true
		expect(fn.calledOnce).to.be.true
	})
})