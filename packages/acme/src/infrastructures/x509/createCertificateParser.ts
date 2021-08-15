import {
	Certificate
} from "@beatrice/common"
import { Certificate as x509Certificate } from '@fidm/x509'

const initParser = () => (
	pem: string
): Promise<Certificate | null> => Promise.resolve(x509Certificate.fromPEM(Buffer.from(pem, 'utf-8')))

export default () => ({
	parse: initParser()
})