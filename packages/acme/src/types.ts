import {
	Id,
	Certificate,
	Updatable,
	SSL,
	Retrievable,
	Generator,
	Parser
} from "@beatrice/common"

export type CertificateGenerator = Generator<AcmeAccount, SSL>
export type CertificateParser = Parser<string, Certificate>
export type KeyGenerator = Generator<any, any>

export type CertificateRenewer = {
	acmeAccount: AcmeAccount,
	certificateGenerator: CertificateGenerator,
	certificateParser: CertificateParser,
	certificateRepository: Updatable<SSL> & Retrievable<SSL>,
	acmeAccountRepository: Updatable<AcmeAccount>,
	renewalListeners?: Function[],
	force?: boolean
}

export type AcmeAccount = SSL & {
	id: Id,
	key: any,
	email: string,
	domains: string[]
}

export type AcmeAccountRepository = Retrievable<AcmeAccount> & Updatable<AcmeAccount>