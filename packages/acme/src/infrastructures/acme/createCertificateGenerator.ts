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

const initGenerator = (
	directoryUrl: string,
	challenges: AcmeChallenge
) => async (
	account: AcmeAccount
): Promise<SSL | null> => {
	if (!account || !account.key) {
		throw new Error("Account or account key not found");
	}

	const acme = ACME.create({
		maintainerEmail: account.email,
		packageAgent: `${pkg.name}/${pkg.version}`,
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
		throw new Error(`Could not create ACME account for ${ account.id }`);
	}

	const serverKeypair = await Keypairs.generate({
		kty: "RSA",
		format: "jwk"
	});
	const serverKey = serverKeypair.private;
	const serverPem = await Keypairs.export({ jwk: serverKey });

	const rawDomains = includeWildcards(account.domains);
	if (!rawDomains || rawDomains.length <= 0) {
		throw new Error(`Domains for ${ account.id } is empty`);
	}

	const domains = rawDomains.map(domain => punycode.toASCII(domain));
	const encoding = "der";
	const csrDer = await CSR.csr({
		jwk: serverKey,
		domains,
		encoding
	}).catch((err: any) => { throw new Error(err) });
	const csr = PEM.packBlock({
		type: "CERTIFICATE REQUEST",
		bytes: csrDer
	});
	if (!csr) {
		throw new Error(`Could not create CSR for ${ account.id }`);
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
			throw new Error(`Could not create PEMS for ${ account.id }`);
		}

		return {
			privateKey: serverPem,
			certificate: `${pems.cert}\n${pems.chain}\n`
		};
	} catch (error: any) {
		throw new Error(error);
	}
}

export default (
	challenges: AcmeChallenge,
	staging: boolean = true
) => ({
	generate: initGenerator(
		staging ? DIR_STAGING : DIR_PROD,
		challenges
	)
})