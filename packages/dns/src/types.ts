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
	type: RecordType
	name?: Domain | Domain[]
	data?: string | object
}

export type ZoneData = {
	mname: string;
	rname: string;
	serial: string;
	refresh: string;
	retry: string;
	expire: string;
	ttl: string;
}

export type Question = {
	type?: string;
}