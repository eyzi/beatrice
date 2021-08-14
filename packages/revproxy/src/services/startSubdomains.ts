import { Starter } from "@beatrice/common"
import { Subdomain } from "../types"
import startSubdomain from "./startSubdomain"

export default (
	controller: Starter<Subdomain>
) => async (
	subdomains: Subdomain[]
): Promise<Subdomain[]> => Promise.all(subdomains.map(startSubdomain(controller)))