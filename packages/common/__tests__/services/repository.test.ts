import { expect } from "chai";
import { stub } from "sinon";
import {
	getEntityId,
	persistenceCreate,
	persistenceGet,
	persistenceQuery,
	persistenceUpdate,
	persistenceDelete,
} from "../../src/services/repository"
import { Id } from "../../src/types";

type Test = { id: Id }
type TestQuery = {}
const sampleRepository = {
	create: async () => ({ id: "test-id" }),
	get: async () => ({ id: "test-id" }),
	query: async () => [],
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
		persistenceCreate<Test>(sampleRepository)({})
		expect(fn.calledOnce).to.be.true
	})
})

describe("persistenceGet", () => {
	it("should call get function", () => {
		const fn = stub(sampleRepository, "get")
		persistenceGet<Test>(sampleRepository)("test-id")
		expect(fn.calledOnce).to.be.true
	})
})

describe("persistenceQuery", () => {
	it("should call query function", () => {
		const fn = stub(sampleRepository, "query")
		persistenceQuery<Test, TestQuery>(sampleRepository)({})
		expect(fn.calledOnce).to.be.true
	})
})

describe("persistenceUpdate", () => {
	it("should call update function", () => {
		const fn = stub(sampleRepository, "update")
		persistenceUpdate<Test>(sampleRepository)({ id: "test-id" }, {})
		expect(fn.calledOnce).to.be.true
	})
})

describe("persistenceDelete", () => {
	it("should call delete function", () => {
		const fn = stub(sampleRepository, "delete")
		persistenceDelete<Test>(sampleRepository)({ id: "test-id" })
		expect(fn.calledOnce).to.be.true
	})
})