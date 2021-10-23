const Keypairs = require("@root/keypairs");
import { KeyGenerator } from "../../types";
import { KeyGenKeypair } from "./types";

const initGenerator = () =>
  Keypairs.generate({
    kty: "RSA",
    format: "jwk",
  }).then((keypair: KeyGenKeypair) => keypair.private);

const keyGenerator: KeyGenerator = {
  generate: initGenerator,
};

export default keyGenerator;
