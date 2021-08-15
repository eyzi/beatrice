export type AcmeAccountDocument = {
	_id: string,
	key: any,
	email: string,
	domains: string[],
	privateKey: string | null,
	certificate: string | null
}