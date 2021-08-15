const Keypairs = require("@root/keypairs")
import {
	KeyGenerator
} from "../../types"
import {
	KeyGenKeypair
} from "./types"

const initGenerator = () => async () => Keypairs.generate({
		kty: "RSA",
		format: "jwk"
	}).then((keypair: KeyGenKeypair) => keypair.private)

export default (): KeyGenerator => ({
	generate: initGenerator()
})