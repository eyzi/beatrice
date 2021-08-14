import { expect } from "chai"
import { stub } from "sinon"

import { Queryable } from "@beatrice/common"

import { Record, RecordQuery } from "../../src/types"
import queryRecord from "../../src/services/queryRecord"

describe("queryRecord", () => {
	const testRecord: Record = {
		id: "test-id",
		name: "test-domain",
		type: "test-type",
		data: "test-data",
		ttl: "test-ttl"
	}
	const repository: Queryable<Record, RecordQuery> = {
		query: async () => [testRecord]
	}

	it("should return record on create", async () => {
		const fn = stub(repository, "query").resolves([testRecord])
		expect(await queryRecord(repository, { type: "test-type" })).to.eql([testRecord])
		expect(fn.calledOnce).to.be.true
	})
})