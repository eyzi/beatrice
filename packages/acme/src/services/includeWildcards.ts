const includeWildcard = (
	domain: string
): string[] => [domain, `*.${ domain }`]

export default (
	domains: string[]
): string[] => domains.map(includeWildcard).flat()