import mongoose from "mongoose"
import initDB from "../infrastructures/mongodb/createSubdomainRepository"
import { SubdomainRepository } from "../types";

const DB_OPTIONS = {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
};

export default async (
	dbString: string
): Promise<SubdomainRepository | undefined> => {
	if (!dbString) return undefined
	const db = await mongoose.connect(dbString, DB_OPTIONS)
	db.pluralize(null)
	return initDB(db.connection)
}