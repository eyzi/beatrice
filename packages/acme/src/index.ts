require("dotenv").config()

import startApp from "./app"

const {
	PORT_ACME_API,
	PROD,
	CERT_DIR,
	DB_STRING
} = process.env

startApp({
	apiPort: PORT_ACME_API,
	staging: !(PROD === "true"),
	certDir: CERT_DIR,
	dbString: DB_STRING
});