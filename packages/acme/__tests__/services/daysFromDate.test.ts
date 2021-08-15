import { expect } from "chai"
import daysFromDate from "../../src/services/daysFromDate"

describe("daysFromToday", () => {
	it("should return a date", () => {
		expect(daysFromDate(0)).to.be.a("date")
	})

	it("should calculate proper date", () => {
		expect(daysFromDate(1, new Date("2021-08-14T20:25:28.364Z"))).to.eql(new Date("2021-08-15T20:25:28.364Z"))
		expect(daysFromDate(5, new Date("2021-08-14T20:25:28.364Z"))).to.eql(new Date("2021-08-19T20:25:28.364Z"))
		expect(daysFromDate(10, new Date("2021-08-14T20:25:28.364Z"))).to.eql(new Date("2021-08-24T20:25:28.364Z"))
	})

	it("should not change input date", () => {
		const inputDate = new Date("2021-08-14T20:44:49.493Z")
		daysFromDate(10, inputDate)
		expect(inputDate).to.eql(new Date("2021-08-14T20:44:49.493Z"))
	})
})