import { expect } from "chai"
import { SinonStub, stub } from "sinon"
import { Certificate } from "@beatrice/common"
import parseCertificate from "../../src/services/parseCertificate"
import { CertificateParser } from "../../src/types"

describe("parseCertificate", () => {
	const testCert: Certificate = {
		validTo: new Date()
	}
	const parser: CertificateParser = {
		parse: async (_certString: string) => testCert
	}

	let parseStub: SinonStub
	beforeEach(() => { parseStub = stub(parser, "parse").resolves(testCert) })
	afterEach(() => { parseStub.restore() })

	it("should generate a certificate", async () => {
		const generatedCert = await parseCertificate(parser)("test-cert")
		expect(generatedCert).to.eql(testCert)
		expect(parseStub.calledOnceWith("test-cert")).to.be.true
	})

	it("should not generate a certificate for null pem", async () => {
		const generatedCert = await parseCertificate(parser)(null)
		expect(generatedCert).to.be.null
		expect(parseStub.calledOnce).to.be.false
	})
})