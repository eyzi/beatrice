require("dotenv").config()

import startApp from "./app"

const {
	PORT_ACME_API,
	PROD,
	CERT_DIR,
	SCHEDULE,
	MARGIN_DAYS,
	DB_STRING,
	URL_CHALLENGE,
	URL_LISTENER
} = process.env

startApp({
	apiPort: PORT_ACME_API,
	staging: !(PROD === "true"), // staging:true has to be default in case env variable doesn't exist
	certDir: CERT_DIR,
	dbString: DB_STRING,
	challengeUrl: URL_CHALLENGE,
	listenerUrl: URL_LISTENER,
	marginDays: MARGIN_DAYS ?? 30,
	schedule: SCHEDULE ?? "0 0 * * *"
});