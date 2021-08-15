import { resolve } from "path";
const ACME = require("acme");
const pkg = require(resolve(__dirname, "..", "..", "..", "package.json"));
const punycode = require("punycode");
const Keypairs = require("@root/keypairs");
const CSR = require("@root/csr");
const PEM = require("@root/pem");
import { SSL } from "@beatrice/common";
import includeWildcards from "../../services/includeWildcards";
import { AcmeAccount } from "../../types";
import {
	AcmeChallenge
} from "./types"

const DIR_STAGING = "https://acme-staging-v02.api.letsencrypt.org/directory";
const DIR_PROD = "https://acme-v02.api.letsencrypt.org/directory";
const EMPTY_CERTIFICATE: SSL = {
	privateKey: null,
	certificate: null
};

const initGenerator = (
	directoryUrl: string,
	challenges: AcmeChallenge
) => async (
	account: AcmeAccount
) => {
	if (!account || !account.key) {
		console.error("Account or account key not found");
		return EMPTY_CERTIFICATE;
	}

	const acme = ACME.create({
		maintainerEmail: account.email,
		packageAgent: `${pkg.name}:${pkg.version}`,
		notify: (event: any, details: string | object) => {
			if (event === "error") console.error(details);
		}
	});
	await acme.init(directoryUrl);

	const acmeAccount = await acme.accounts.create({
		subscriberEmail: account.email,
		agreeToTerms: true,
		accountKey: account.key
	});
	if (!acmeAccount) {
		console.error(`Could not create ACME account for ${ account.id }`);
		return EMPTY_CERTIFICATE;
	}

	const serverKeypair = await Keypairs.generate({
		kty: "RSA",
		format: "jwk"
	});
	const serverKey = serverKeypair.private;
	const serverPem = await Keypairs.export({ jwk: serverKey });

	const rawDomains = includeWildcards(account.domains);
	if (!rawDomains || rawDomains.length <= 0) {
		console.error(`Domains for ${ account.id } is empty`);
		return EMPTY_CERTIFICATE;
	}

	const domains = rawDomains.map(domain => punycode.toASCII(domain));
	console.log(domains);
	const encoding = "der";
	const csrDer = await CSR.csr({
		jwk: serverKey,
		domains,
		encoding
	}).catch(console.error);
	const csr = PEM.packBlock({
		type: "CERTIFICATE REQUEST",
		bytes: csrDer
	});
	if (!csr) {
		console.error(`Could not create CSR for ${ account.id }`);
		return EMPTY_CERTIFICATE;
	}

	try {
		const pems = await acme.certificates.create({
			account: acmeAccount,
			accountKey: account.key,
			csr,
			domains,
			challenges
		});
		if (!pems) {
			console.error(`Could not create PEMS for ${ account.id }`);
			return EMPTY_CERTIFICATE;
		}

		return {
			privateKey: serverPem,
			certificate: `${pems.cert}\n${pems.chain}\n`
		};
	} catch (error) {
		console.error(error);
		return EMPTY_CERTIFICATE;
	}
}

export default (
	challenges: AcmeChallenge,
	staging: boolean = true
) => ({
	generator: initGenerator(
		staging ? DIR_STAGING : DIR_PROD,
		challenges
	)
})