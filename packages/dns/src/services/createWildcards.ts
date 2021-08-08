import { Domain } from "../types"

export default (
	domain: Domain
): Domain[] => {
	const levels = domain.split(".")
	return levels.length > 2 ? [domain, ["*", ...levels.slice(1)].join(".")] : [domain]
}