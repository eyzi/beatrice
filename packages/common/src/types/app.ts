export type Starter<T> = {
	start: (app: T) => Promise<T>
}

export type Stopper<T> = {
	stop: (app: T) => Promise<T>
}