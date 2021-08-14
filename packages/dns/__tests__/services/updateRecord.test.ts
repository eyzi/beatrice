import { expect } from "chai"
import { stub } from "sinon"

import { Updatable } from "@beatrice/common"

import { Record } from "../../src/types"
import updateRecord from "../../src/services/updateRecord"

describe("updateRecord", () => {
	const testRecord: Record = {
		id: "test-id",
		name: "test-domain",
		type: "test-type",
		data: "test-data",
		ttl: "test-ttl"
	}
	const repository: Updatable<Record> = {
		update: async () => testRecord
	}

	it("should return record on create", async () => {
		const fn = stub(repository, "update").resolves(testRecord)
		expect(await updateRecord(repository, testRecord, {})).to.eql(testRecord)
		expect(fn.calledOnce).to.be.true
	})
})