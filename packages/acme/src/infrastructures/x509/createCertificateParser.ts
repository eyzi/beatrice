import {
	Certificate
} from "@beatrice/common"
import { Certificate as x509Certificate } from '@fidm/x509'

const initParser = () => (
	pem: Buffer
): Certificate => x509Certificate.fromPEM(pem)

export default () => ({
	parse: initParser()
})