import { Document } from 'mongoose';

export type RecordDocument = Document & {
	_id: string,
	name: string,
	type: string,
	data: string | object,
	ttl: string
}