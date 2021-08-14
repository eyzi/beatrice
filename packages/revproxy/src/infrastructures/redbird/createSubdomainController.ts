const Redbird = require("redbird")
import { existsSync } from "fs"
import { resolve } from "path"
import {
	Certificate
} from "@beatrice/common"
import {
	Subdomain,
	SubdomainController
} from "../../types"

const CERT_KEY_FILE = "privkey.pem"
const CERT_FULL_FILE = "fullchain.pem"

const getSSL = async (
	certDir: string,
	certificateId: string
): Promise<Certificate> => {
	if (
		!certDir ||
		!existsSync(resolve(certDir)) ||
		!existsSync(resolve(certDir, certificateId))
	) return { privateKey: null, certificate: null };

	return {
		privateKey: resolve(certDir, certificateId, CERT_KEY_FILE),
		certificate: resolve(certDir, certificateId, CERT_FULL_FILE)
	};
}

const initStarter = (
	proxy: any,
	certDir: string
) => async (
	subdomain: Subdomain
) => {
	const {
		privateKey,
		certificate
	} = await getSSL(certDir, subdomain.certificateId)
	proxy.register(subdomain.domain, subdomain.url, {
		key: privateKey,
		cert: certificate
	})
	return subdomain
}

const initStopper = (
	proxy: any,
	_certDir: string
) => async (
	subdomain: Subdomain
) => {
	proxy.unregister(subdomain.domain, subdomain.url)
	return subdomain
}

export default ({
	httpPort,
	httpsPort,
	useHttp2,
	logName,
	isVerbose,
	certDir
}: any): SubdomainController => {
	const ssl = httpsPort ? {
		host: "0.0.0.0",
		port: httpsPort,
		http2: useHttp2 ?? false,
	} : false;
	const bunyan = isVerbose ? {
		name: logName
	} : false; 
	const proxy = Redbird({
		host: "0.0.0.0",
		port: httpPort,
		xfwd: false,
		ssl,
		bunyan
	});

	return {
		start: initStarter(proxy, certDir),
		stop: initStopper(proxy, certDir)
	}
}