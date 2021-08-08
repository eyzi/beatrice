import { expect } from "chai"
import createAnswer from "../../src/services/createAnswer"
import { Record, RecordQuery, RecordRepository } from "../../src/types"

describe("createAnswer", () => {
	const testRecord: Record = {
		name: "test-domain",
		type: "test-type",
		data: "test-data",
		ttl: "test-ttl"
	}
	const repository: RecordRepository = {
		query: async (query: RecordQuery) => [testRecord]
	}

	it("should return answer for query", async () => {
		expect(await createAnswer("test-domain", "test-type", repository)).to.eql([testRecord])
	})
})