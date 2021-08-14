import { Stopper } from "@beatrice/common"
import { Subdomain } from "../types"

export default (
	subdomainController: Stopper<Subdomain>
) => async (
	subdomain: Subdomain
): Promise<Subdomain> => subdomainController.stop(subdomain)