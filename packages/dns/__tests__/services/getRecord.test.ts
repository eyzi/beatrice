import { expect } from "chai"
import { stub } from "sinon"

import { Retrievable } from "@beatrice/common"

import { Record } from "../../src/types"
import getRecord from "../../src/services/getRecord"

describe("getRecord", () => {
	const testRecord: Record = {
		id: "test-id",
		name: "test-domain",
		type: "test-type",
		data: "test-data",
		ttl: "test-ttl"
	}
	const repository: Retrievable<Record> = {
		get: async () => testRecord
	}

	it("should return record on create", async () => {
		const fn = stub(repository, "get").resolves(testRecord)
		expect(await getRecord(repository, "test-id")).to.eql(testRecord)
		expect(fn.calledOnce).to.be.true
	})
})