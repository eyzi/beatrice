import { expect } from "chai"
import { spy, stub, createSandbox, SinonSandbox } from "sinon"

import { Queryable } from "@beatrice/common"

import { Record, RecordQuery } from "../../src/types"
import createAnswer from "../../src/services/createAnswer"

describe("createAnswer", () => {
	let sandbox: SinonSandbox;
	beforeEach(() => {
		sandbox = createSandbox()
	})
	afterEach(() => {
		sandbox.restore()
	})

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

	it("should return exact query when found", async () => {
		const fn = sandbox.stub(repository, "query")
		fn.onFirstCall().resolves([testRecord])
		fn.onSecondCall().resolves([])

		const result = await createAnswer(repository, "the.test.domain", "test-type")
		expect(result).to.eql([testRecord])
	})

	it("should return wildcard query when exact query is empty", async () => {
		const fn = sandbox.stub(repository, "query")
		fn.onFirstCall().resolves([])
		fn.onSecondCall().resolves([])

		const result = await createAnswer(repository, "the.test.domain", "test-type")
		expect(result).to.eql([])
	})
})