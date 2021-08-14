import {
	SubdomainController,
	Subdomain
} from "../types"
import startSubdomain from "./startSubdomain"
import stopSubdomain from "./stopSubdomain"

export default (
	subdomainController: SubdomainController
) => async (
	subdomain: Subdomain | null
): Promise<Subdomain | null> => {
	if (!subdomain) return null
	
	await stopSubdomain(subdomainController)(subdomain)
	return startSubdomain(subdomainController)(subdomain)
}