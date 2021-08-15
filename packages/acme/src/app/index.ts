import createDB from "./createDB"

export default async ({
	apiPort,
	staging,
	certDir,
	dbString
}: any) => {
	const repository = await createDB(dbString)
}