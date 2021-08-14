import {
	Queryable
} from "@beatrice/common"
import {
	Subdomain,
	SubdomainQuery
} from "../types";

export default async (
	subdomainRepository: Queryable<Subdomain, SubdomainQuery>
): Promise<Subdomain[]> => subdomainRepository.query({})