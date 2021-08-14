export type Id = string
export type OmitId<T> = Omit<T, "id">

export type Retrievable<T> = {
	get: (id: Id) => Promise<T | null>
}

export type Creatable<T> = {
	create: (body: OmitId<T>) => Promise<T>
}

export type Updatable<T> = {
	update: (object: T | Id, body: Partial<T>) => Promise<T | null>
}

export type Deletable<T> = {
	delete: (object: T | Id) => Promise<boolean>
}

export type Queryable<T, Q> = {
	query: (query: Q) => Promise<T[]>
}

export type Repository<T, Q> =
	Creatable<T> &
	Retrievable<T> &
	Queryable<T, Q> &
	Updatable<T> &
	Deletable<T>