import { expect } from "chai"
import { stub } from "sinon"

import { Creatable } from "@beatrice/common"

import { Record } from "../../src/types"
import createRecord from "../../src/services/createRecord"

describe("createRecord", () => {
	const testRecord: Record = {
		id: "test-id",
		name: "test-domain",
		type: "test-type",
		data: "test-data",
		ttl: "test-ttl"
	}
	const repository: Creatable<Record> = {
		create: async () => testRecord
	}

	it("should return record on create", async () => {
		const fn = stub(repository, "create").resolves(testRecord)
		expect(await createRecord(repository, testRecord)).to.eql(testRecord)
		expect(fn.calledOnce).to.be.true
	})
})