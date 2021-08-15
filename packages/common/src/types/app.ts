export type Starter<T> = {
	start: (app: T) => Promise<T>
}

export type Stopper<T> = {
	stop: (app: T) => Promise<T>
}

export type Generator<S, T> = {
	generate: (input: S) => Promise<T | null>
}

export type Parser<S, T> = {
	parse: (input: S) => Promise<T | null>
}