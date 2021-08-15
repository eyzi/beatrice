import { Retrievable, Updatable } from "@beatrice/common";
import mongoose from "mongoose"
import initDB from "../infrastructures/mongodb/createAcmeAccountRepository"
import { AcmeAccount } from "../types";

const DB_OPTIONS = {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
};

export default async (
	dbString: string
): Promise<Updatable<AcmeAccount> & Retrievable<AcmeAccount> | undefined> => {
	if (!dbString) return undefined
	const db = await mongoose.connect(dbString, DB_OPTIONS)
	db.pluralize(null)
	return initDB(db.connection)
}