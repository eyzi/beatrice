import { expect } from "chai"
import isDue from "../../src/services/isDue"

describe("isDue", () => {
	it("should return true if due date is today", () => {
		const dueDate = new Date()
		const certificate = { validTo: new Date() }
		expect(isDue(certificate, dueDate)).to.be.true
	})

	it("should return true if due date has passed", () => {
		const dueDate = new Date()
		dueDate.setDate(dueDate.getDate() - 5)
		const certificate = { validTo: new Date() }
		expect(isDue(certificate, dueDate)).to.be.true
	})

	it("should return true if due date is within margin days", () => {
		const dueDate = new Date()
		dueDate.setDate(dueDate.getDate() + 5)
		const certificate = { validTo: new Date() }
		expect(isDue(certificate, dueDate, 10)).to.be.true
	})

	it("should return false if due date ahead of valid date plus margin", () => {
		const dueDate = new Date()
		dueDate.setDate(dueDate.getDate() + 10)
		const certificate = { validTo: new Date() }
		expect(isDue(certificate, dueDate, 5)).to.be.false
	})
})