import mongoose, { Connection } from "mongoose"

const DB_OPTIONS = {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
};

export default async <T>(
	dbString: string,
	dbCreator: (db: Connection) => T
): Promise<T> => {
	const db = await mongoose.connect(dbString, DB_OPTIONS)
	db.pluralize(null)
	return dbCreator(db.connection)
}