import { Certificate, SSL } from "@beatrice/common"
import { expect } from "chai"
import { createSandbox, SinonSandbox, SinonStub } from "sinon"
import renewCertificate from "../../src/services/renewCertificate"
import { AcmeAccount, CertificateGenerator, CertificateParser } from "../../src/types"

describe("renewCertificate", () => {
	const ssl: SSL = {
		privateKey: "test-privkey",
		certificate: "test-cert"
	}
	const cert: Certificate = {
		validTo: new Date()
	}
	const acmeAccount: AcmeAccount = {
		...ssl,
		id: "test-id",
		key: {},
		email: "test-email",
		domains: ["test.domain"]
	}
	const certificateGenerator: CertificateGenerator = {
		generate: async () => ssl
	}
	const certificateParser: CertificateParser = {
		parse: async () => cert
	}
	const certificateRepository = {
		get: async () => ssl,
		update: async () => ssl
	}
	const acmeAccountRepository = {
		update: async () => acmeAccount
	}

	let sandbox: SinonSandbox,
		stubCertParser: SinonStub,
		stubCertGenerator: SinonStub,
		stubCertGetter: SinonStub,
		stubCertUpdater: SinonStub,
		stubAccountUpdater: SinonStub,
		stubListener: SinonStub

	beforeEach(() => {
		sandbox = createSandbox()
		stubCertParser = sandbox.stub(certificateParser, "parse")
		stubCertGenerator = sandbox.stub(certificateGenerator, "generate").resolves(ssl)
		stubCertGetter = sandbox.stub(certificateRepository, "get").resolves(ssl)
		stubCertUpdater = sandbox.stub(certificateRepository, "update").resolves(ssl)
		stubAccountUpdater = sandbox.stub(acmeAccountRepository, "update").resolves(acmeAccount)
		stubListener = sandbox.stub()
	})
	afterEach(() => { sandbox.restore() })

	it("should renew when due", async () => {
		stubCertParser.resolves({ validTo: new Date() })
		await renewCertificate({
			acmeAccount,
			certificateGenerator,
			certificateParser,
			certificateRepository,
			acmeAccountRepository,
			renewalListeners: [stubListener]
		})
		expect(stubCertGetter.calledOnce).to.be.true
		expect(stubCertParser.calledOnce).to.be.true
		expect(stubCertGenerator.calledOnce).to.be.true
		expect(stubCertUpdater.calledOnce).to.be.true
		expect(stubAccountUpdater.calledOnce).to.be.true
		expect(stubListener.calledOnce).to.be.true
	})

	it("should not renew when not due and not forced", async () => {
		const due = new Date()
		due.setDate(due.getDate() + 100)
		stubCertParser.resolves({ validTo: due })
		await renewCertificate({
			acmeAccount,
			certificateGenerator,
			certificateParser,
			certificateRepository,
			acmeAccountRepository,
			renewalListeners: [stubListener],
			force: false
		})
		expect(stubCertGetter.calledOnce).to.be.true
		expect(stubCertParser.calledOnce).to.be.true
		expect(stubCertGenerator.calledOnce).to.be.false
		expect(stubCertUpdater.calledOnce).to.be.false
		expect(stubAccountUpdater.calledOnce).to.be.false
		expect(stubListener.calledOnce).to.be.false
	})

	it("should renew when not due and forced", async () => {
		const due = new Date()
		due.setDate(due.getDate() + 100)
		stubCertParser.resolves({ validTo: due })
		await renewCertificate({
			acmeAccount,
			certificateGenerator,
			certificateParser,
			certificateRepository,
			acmeAccountRepository,
			renewalListeners: [stubListener],
			force: true
		})
		expect(stubCertGetter.calledOnce).to.be.true
		expect(stubCertParser.calledOnce).to.be.true
		expect(stubCertGenerator.calledOnce).to.be.true
		expect(stubCertUpdater.calledOnce).to.be.true
		expect(stubAccountUpdater.calledOnce).to.be.true
		expect(stubListener.calledOnce).to.be.true
	})

	it("should not renew when generator fails", async () => {
		stubCertParser.resolves({ validTo: new Date() })
		stubCertGenerator.resolves(null)
		await renewCertificate({
			acmeAccount,
			certificateGenerator,
			certificateParser,
			certificateRepository,
			acmeAccountRepository,
			renewalListeners: [stubListener]
		})
		expect(stubCertGetter.calledOnce).to.be.true
		expect(stubCertParser.calledOnce).to.be.true
		expect(stubCertGenerator.calledOnce).to.be.true
		expect(stubCertUpdater.calledOnce).to.be.false
		expect(stubAccountUpdater.calledOnce).to.be.false
		expect(stubListener.calledOnce).to.be.false
	})
})