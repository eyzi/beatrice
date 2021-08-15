import {
	Id,
	OmitId,
	HasId,
	Creatable,
	Retrievable,
	Queryable,
	Updatable,
	Deletable
} from "../types"

export const getEntityId = <T extends HasId>(
	entity: T | Id
) => typeof entity === "string" ? entity : entity.id

export const persistenceCreate = <T>(
	repository: Creatable<T>
) => async (
	body: OmitId<T>
): Promise<T> => repository.create(body)

export const persistenceGet = <T>(
	repository: Retrievable<T>
) => async (
	id: Id
): Promise<T | null> => repository.get(id)

export const persistenceQuery = <T, Q>(
	repository: Queryable<T, Q>
) => async (
	query: Q
): Promise<T[]> => repository.query(query)

export const persistenceUpdate = <T>(
	repository: Updatable<T>
) => async (
	entity: T | Id,
	body: Partial<T>
): Promise<T | null> => repository.update(entity, body)

export const persistenceDelete = <T>(
	repository: Deletable<T>
) => async (
	entity: T | Id
): Promise<boolean> => repository.delete(entity)