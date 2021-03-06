import { expect } from "chai"
import { spy, stub } from "sinon"

import { Queryable } from "@beatrice/common"

import { Record, RecordQuery } from "../../src/types"
import createAnswer from "../../src/services/createAnswer"

describe("createAnswer", () => {
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

	it("should call repository's query function", async () => {
		const fn = stub(repository, "query").resolves([testRecord])
		expect(await createAnswer(repository, "test-domain", "test-type")).to.eql([testRecord])
		expect(fn.calledOnceWith({ type: "test-type", name: ["test-domain"] })).to.be.true
	})
})