import { Id } from "./entity";

export type SSL = {
	id?: Id;
	privateKey: string | null;
	certificate: string | null;
}