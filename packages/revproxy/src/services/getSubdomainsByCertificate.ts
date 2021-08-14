import {
	Id,
	Queryable
} from "@beatrice/common"
import {
	Subdomain,
	SubdomainQuery
} from "../types";

export default async (
	subdomainRepository: Queryable<Subdomain, SubdomainQuery>,
	certificateId: Id
): Promise<Subdomain[]> => subdomainRepository.query({ certificateId })