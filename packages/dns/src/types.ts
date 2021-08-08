export type RecordType = string

export type Domain = string

export type Record = {
	id: string
	name: Domain
	type: RecordType
	data: string | object
	ttl: string
}

export type RecordQuery = {
	type: RecordType | RecordType[]
	name?: Domain | Domain[]
	data?: string | object
}

export type RecordRepository = {
	query: (query: RecordQuery) => Promise<Record[]>
	create: (record: Omit<Record, "id">) => Promise<Record | null>
	update: (id: string, body: Partial<Record>) => Promise<Record | null>
}