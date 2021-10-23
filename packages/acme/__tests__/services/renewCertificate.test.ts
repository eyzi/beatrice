import { Certificate, SSL } from "@beatrice/common";
import { expect } from "chai";
import { createSandbox, SinonSandbox, SinonStub } from "sinon";
import renewCertificate from "../../src/services/renewCertificate";
import {
  AcmeAccount,
  CertificateGenerator,
  KeyGenerator,
  CertificateParser,
} from "../../src/types";

describe("renewCertificate", () => {
  const ssl: SSL = {
    privateKey: "test-privkey",
    certificate: "test-cert",
  };
  const cert: Certificate = {
    validTo: new Date(),
  };
  const acmeAccount: AcmeAccount = {
    ...ssl,
    id: "test-id",
    key: {},
    email: "test-email",
    domains: ["test.domain"],
  };
  const certificateGenerator: CertificateGenerator = {
    generate: async () => ssl,
  };
  const keyGenerator: KeyGenerator = {
    generate: async () => ({}),
  };
  const certificateParser: CertificateParser = {
    parse: async () => cert,
  };
  const certificateRepository = {
    get: async () => ssl,
    update: async () => ssl,
  };
  const acmeAccountRepository = {
    get: async () => acmeAccount,
    update: async () => acmeAccount,
  };

  let sandbox: SinonSandbox,
    stubCertParser: SinonStub,
    stubCertGenerator: SinonStub,
    stubKeyGenerator: SinonStub,
    stubCertGetter: SinonStub,
    stubCertUpdater: SinonStub,
    stubAccountUpdater: SinonStub,
    stubListener: SinonStub;

  beforeEach(() => {
    sandbox = createSandbox();
    stubCertParser = sandbox.stub(certificateParser, "parse");
    stubCertGenerator = sandbox
      .stub(certificateGenerator, "generate")
      .resolves(ssl);
    stubKeyGenerator = sandbox.stub(keyGenerator, "generate").resolves(ssl);
    stubCertGetter = sandbox.stub(certificateRepository, "get").resolves(ssl);
    stubCertUpdater = sandbox
      .stub(certificateRepository, "update")
      .resolves(ssl);
    stubAccountUpdater = sandbox
      .stub(acmeAccountRepository, "update")
      .resolves(acmeAccount);
    stubListener = sandbox.stub();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it("should renew when due", async () => {
    stubCertParser.resolves({ validTo: new Date() });
    const { renewed } = await renewCertificate({
      acmeAccount,
      certificateGenerator,
      certificateParser,
      certificateRepository,
      acmeAccountRepository,
      keyGenerator,
      renewalListeners: [stubListener],
    });
    expect(renewed).to.be.true;
    expect(stubCertGetter.calledOnce).to.be.true;
    expect(stubCertParser.calledOnce).to.be.true;
    expect(stubCertGenerator.calledOnce).to.be.true;
    expect(stubKeyGenerator.calledOnce).to.be.false;
    expect(stubCertUpdater.calledOnce).to.be.true;
    expect(stubAccountUpdater.calledOnce).to.be.true;
    expect(stubListener.calledOnce).to.be.true;
  });

  it("should not renew when not due and not forced", async () => {
    const due = new Date();
    due.setDate(due.getDate() + 100);
    stubCertParser.resolves({ validTo: due });
    const { renewed, message } = await renewCertificate({
      acmeAccount,
      certificateGenerator,
      certificateParser,
      certificateRepository,
      acmeAccountRepository,
      keyGenerator,
      renewalListeners: [stubListener],
      force: false,
    });
    expect(renewed).to.be.false;
    expect(message).to.eql("Certificate is not due");
    expect(stubCertGetter.calledOnce).to.be.true;
    expect(stubCertParser.calledOnce).to.be.true;
    expect(stubCertGenerator.calledOnce).to.be.false;
    expect(stubKeyGenerator.calledOnce).to.be.false;
    expect(stubCertUpdater.calledOnce).to.be.false;
    expect(stubAccountUpdater.calledOnce).to.be.false;
    expect(stubListener.calledOnce).to.be.false;
  });

  it("should renew when not due and forced", async () => {
    const due = new Date();
    due.setDate(due.getDate() + 100);
    stubCertParser.resolves({ validTo: due });
    const { renewed } = await renewCertificate({
      acmeAccount,
      certificateGenerator,
      certificateParser,
      certificateRepository,
      acmeAccountRepository,
      keyGenerator,
      renewalListeners: [stubListener],
      force: true,
    });
    expect(renewed).to.be.true;
    expect(stubCertGetter.calledOnce).to.be.true;
    expect(stubCertParser.calledOnce).to.be.true;
    expect(stubCertGenerator.calledOnce).to.be.true;
    expect(stubKeyGenerator.calledOnce).to.be.true;
    expect(stubCertUpdater.calledOnce).to.be.true;
    expect(stubAccountUpdater.calledTwice).to.be.true;
    expect(stubListener.calledOnce).to.be.true;
  });

  it("should not renew when generator doesn't generate cert", async () => {
    stubCertParser.resolves({ validTo: new Date() });
    stubCertGenerator.resolves(null);
    const { renewed, message } = await renewCertificate({
      acmeAccount,
      certificateGenerator,
      certificateParser,
      certificateRepository,
      acmeAccountRepository,
      keyGenerator,
      renewalListeners: [stubListener],
    });
    expect(renewed).to.be.false;
    expect(message).to.be.eql("Certificate generator failed");
    expect(stubCertGetter.calledOnce).to.be.true;
    expect(stubCertParser.calledOnce).to.be.true;
    expect(stubCertGenerator.calledOnce).to.be.true;
    expect(stubKeyGenerator.calledOnce).to.be.false;
    expect(stubCertUpdater.calledOnce).to.be.false;
    expect(stubAccountUpdater.calledOnce).to.be.false;
    expect(stubListener.calledOnce).to.be.false;
  });

  it("should not renew when generator throws an error", async () => {
    stubCertParser.resolves({ validTo: new Date() });
    stubCertGenerator.throws(new Error("Generator error"));
    const { renewed, message } = await renewCertificate({
      acmeAccount,
      certificateGenerator,
      certificateParser,
      certificateRepository,
      acmeAccountRepository,
      keyGenerator,
      renewalListeners: [stubListener],
    });
    expect(renewed).to.be.false;
    expect(message).to.eql("Error: Generator error");
    expect(stubCertGetter.calledOnce).to.be.true;
    expect(stubCertParser.calledOnce).to.be.true;
    expect(stubCertGenerator.calledOnce).to.be.true;
    expect(stubKeyGenerator.calledOnce).to.be.false;
    expect(stubCertUpdater.calledOnce).to.be.false;
    expect(stubAccountUpdater.calledOnce).to.be.false;
    expect(stubListener.calledOnce).to.be.false;
  });
});
