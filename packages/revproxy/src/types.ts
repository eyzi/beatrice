import {
	Id,
	Starter,
	Stopper,
	Retrievable,
	Queryable
} from "@beatrice/common"

export type Subdomain = {
	id: Id;
	domain: string;
	url: string;
	certificateId: Id;
}

export type SubdomainQuery = {
	certificateId?: Id
}

export type SubdomainRepository = Retrievable<Subdomain> & Queryable<Subdomain, SubdomainQuery>

export type SubdomainController = Starter<Subdomain> & Stopper<Subdomain>