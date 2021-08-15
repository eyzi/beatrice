import {
	Certificate
} from "@beatrice/common"
import daysFromDate from "./daysFromDate"

export default (
	certificate: Certificate,
	dueDate: Date,
	marginDays: number = 0
) => daysFromDate(marginDays, certificate.validTo) >= dueDate