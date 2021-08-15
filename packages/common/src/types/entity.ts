export type Id = string
export type OmitId<T> = Omit<T, "id">
export type HasId = { id: Id }