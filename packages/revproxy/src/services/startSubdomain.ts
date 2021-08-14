import { Starter } from "@beatrice/common"
import { Subdomain } from "../types"

export default (
	subdomainController: Starter<Subdomain>
) => async (
	subdomain: Subdomain
): Promise<Subdomain> => subdomainController.start(subdomain)