import {
	existsSync,
	mkdirSync,
	readFileSync,
	writeFileSync,
	readdirSync
} from "fs"
import { resolve } from "path"
import {
	Id,
	SSL,
	Retrievable,
	Updatable,
	RetrievableAll
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

const getById = async (
	certDir: string,
	id: Id
) => {
	if (!existsSync(resolve(certDir, id))) return EMPTY_CERTIFICATE
	return {
		privateKey: readFileSync(privKeyFile(certDir, id), "ascii"),
		certificate: readFileSync(certFile(certDir, id), "ascii")
	}
}

const initGetAll = (
	certDir: string
) => async (): Promise<SSL[]> => {
	if (!existsSync(resolve(certDir))) return []
	return Promise.all(
		readdirSync(resolve(certDir)).map(async id => {
			const { privateKey, certificate } = await getById(certDir, id)
			return { id, privateKey, certificate }
		})
	)
}

const initGet = (
	certDir: string
) => async (
	id: Id
): Promise<SSL | null> => getById(certDir, id)

const initUpdate = (
	certDir: string
) => async (
	id: SSL | Id,
	body: Partial<SSL>
): Promise<SSL | null> => {
	if (typeof id !== "string") return EMPTY_CERTIFICATE

	if (!existsSync(certDir))
		mkdirSync(resolve(certDir))

	if (!existsSync(resolve(certDir, id))) 
		mkdirSync(resolve(certDir, id))

	writeFileSync(privKeyFile(certDir, id), body.privateKey || "", "ascii")
	writeFileSync(certFile(certDir, id), body.certificate || "", "ascii")
	return body as SSL
}

export default (
	certDir: string
): Updatable<SSL> & Retrievable<SSL> & RetrievableAll<SSL> => ({
	get: initGet(certDir),
	getAll: initGetAll(certDir),
	update: initUpdate(certDir)
})