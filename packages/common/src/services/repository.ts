import {
	Id,
	OmitId,
	Creatable,
	Retrievable,
	Queryable,
	Updatable,
	Deletable
} from "../types"

export const persistenceCreate = async <T>(
	repository: Creatable<T>,
	body: OmitId<T>
): Promise<T> => repository.create(body)

export const persistenceGet = async <T>(
	repository: Retrievable<T>,
	id: Id
): Promise<T | null> => repository.get(id)

export const persistenceQuery = async <T, Q>(
	repository: Queryable<T, Q>,
	query: Q
): Promise<T[]> => repository.query(query)

export const persistenceUpdate = async <T>(
	repository: Updatable<T>,
	entity: T | Id,
	body: Partial<T>
): Promise<T | null> => repository.update(entity, body)

export const persistenceDelete = async <T>(
	repository: Deletable<T>,
	entity: T | Id
): Promise<boolean> => repository.delete(entity)