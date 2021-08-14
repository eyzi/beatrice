import { Document } from 'mongoose';

export type SubdomainDocument = Document & {
	_id: string,
	domain: string,
	url: string,
	certificateId: string
}