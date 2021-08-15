import {
	AcmeAccount,
	CertificateGenerator
} from "../types"

export default (
	generator: CertificateGenerator
) => async (
	acmeAccount: AcmeAccount
) => generator.generate(acmeAccount)