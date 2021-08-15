import { Certificate } from "@beatrice/common";
import { CertificateParser } from "../types"

export default (
	parser: CertificateParser
) => async (
	certString: string | null | undefined
): Promise<Certificate | null> => certString ? parser.parse(certString) : null