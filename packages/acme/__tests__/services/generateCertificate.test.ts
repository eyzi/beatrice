import { expect } from "chai"
import { stub } from "sinon"
import { SSL } from "@beatrice/common"
import generateCertificate from "../../src/services/generateCertificate"
import { AcmeAccount, CertificateGenerator } from "../../src/types"

describe("generateCertificate", () => {
	const testSSL: SSL = {
		privateKey: "test-privkey",
		certificate: "test-cert"
	}
	const testAcmeAccount: AcmeAccount = {
		...testSSL,
		id: "test-id",
		key: {},
		email: "test-email",
		domains: ["test-domain"]
	}
	const generator: CertificateGenerator = {
		generate: async (_account: AcmeAccount) => testSSL
	}

	it("should generate a certificate", async () => {
		const fn = stub(generator, "generate").resolves(testSSL)
		const generatedSSL = await generateCertificate(generator)(testAcmeAccount)
		expect(generatedSSL).to.eql(testSSL)
		expect(fn.calledOnceWith(testAcmeAccount)).to.be.true
	})
})