import { expect } from "chai";
import { stub } from "sinon";
import {
	getEntityId,
	persistenceCreate,
	persistenceGet,
	persistenceQuery,
	persistenceUpdate,
	persistenceDelete,
	persistenceGetAll,
} from "../../src/services/repository"
import { HasId } from "../../src/types";

const sampleRepository = {
	create: async () => ({ id: "test-id" }),
	get: async () => ({ id: "test-id" }),
	getAll: async () => [{ id: "test-id" }],
	query: async () => [{ id: "test-id" }],
	update: async () => ({ id: "test-id" }),
	delete: async () => true
}

describe("getEntityId", () => {
	it("should return id if parameter is string", () => {
		expect((getEntityId("1"))).to.eql("1")
	})

	it("should return id property if parameter is object", () => {
		expect((getEntityId({ id: "2" }))).to.eql("2")
	})
})

describe("persistenceCreate", () => {
	it("should call create function", () => {
		const fn = stub(sampleRepository, "create")
		persistenceCreate<HasId>(sampleRepository)({})
		expect(fn.calledOnce).to.be.true
	})
})

describe("persistenceGet", () => {
	it("should call get function", () => {
		const fn = stub(sampleRepository, "get")
		persistenceGet<HasId>(sampleRepository)("test-id")
		expect(fn.calledOnce).to.be.true
	})
})

describe("persistenceGetAll", () => {
	it("should call get function all", () => {
		const fn = stub(sampleRepository, "getAll")
		persistenceGetAll<HasId>(sampleRepository)()
		expect(fn.calledOnce).to.be.true
	})
})

describe("persistenceQuery", () => {
	it("should call query function", () => {
		const fn = stub(sampleRepository, "query")
		persistenceQuery<HasId, Partial<HasId>>(sampleRepository)({ id: "test-id" })
		expect(fn.calledOnce).to.be.true
	})
})

describe("persistenceUpdate", () => {
	it("should call update function", () => {
		const fn = stub(sampleRepository, "update")
		persistenceUpdate<HasId>(sampleRepository)({ id: "test-id" }, {})
		expect(fn.calledOnce).to.be.true
	})
})

describe("persistenceDelete", () => {
	it("should call delete function", () => {
		const fn = stub(sampleRepository, "delete")
		persistenceDelete<HasId>(sampleRepository)({ id: "test-id" })
		expect(fn.calledOnce).to.be.true
	})
})