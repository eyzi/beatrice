import { AcmeAccount } from "../../types"

export type AcmeChallenge = {
	"dns-01"?: any
}

export type WildcardedAcmeAccount = AcmeAccount & {
	wildcardDomains: string[]
}