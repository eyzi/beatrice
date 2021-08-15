import {
	existsSync,
	mkdirSync,
	readFileSync,
	writeFileSync
} from "fs"
import { resolve } from "path"
import {
	Id,
	SSL
} from "@beatrice/common"

const PRIVKEY_FILE = "privkey.pem"
const CERT_FILE = "fullchain.pem"
const EMPTY_CERTIFICATE: SSL = {
	privateKey: null,
	certificate: null
}

const privKeyFile = (
	certDir: string,
	id: string
) => resolve(certDir, id, PRIVKEY_FILE)

const certFile = (
	certDir: string,
	id: string
) => resolve(certDir, id, CERT_FILE)

const initGet = (
	certDir: string
) => async (
	id: Id
): Promise<SSL> => {
	if (!existsSync(resolve(certDir, id))) return EMPTY_CERTIFICATE
	return {
		privateKey: readFileSync(privKeyFile(certDir, id), "ascii"),
		certificate: readFileSync(certFile(certDir, id), "ascii")
	}
}

const initUpdate = (
	certDir: string
) => async (
	id: Id,
	body: SSL
): Promise<SSL> => {
	if (!existsSync(certDir))
		return EMPTY_CERTIFICATE

	if (!existsSync(resolve(certDir, id))) 
		mkdirSync(resolve(certDir, id))

	writeFileSync(privKeyFile(certDir, id), body.privateKey || "", "ascii")
	writeFileSync(certFile(certDir, id), body.certificate || "", "ascii")
	return body
}

export default (
	certDir: string
) => ({
	get: initGet(certDir),
	update: initUpdate(certDir)
})