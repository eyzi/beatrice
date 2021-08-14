import {
	Id,
	Retrievable
} from "@beatrice/common"
import {
	Subdomain
} from "../types";

export default async (
	subdomainRepository: Retrievable<Subdomain>,
	id: Id
): Promise<Subdomain | null> => subdomainRepository.get(id)