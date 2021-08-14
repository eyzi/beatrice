import mongoose from "mongoose"
import { Repository } from "@beatrice/common"
import initDB from "../infrastructures/mongodb/services/mongoRecordRepository"
import { Record, RecordQuery } from "../types";

const DB_OPTIONS = {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
};

export default async (
	dbString: string
): Promise<Repository<Record, RecordQuery> | undefined> => {
	if (!dbString) return undefined
	const db = await mongoose.connect(dbString, DB_OPTIONS)
	db.pluralize(null)
	return initDB(db.connection)
}