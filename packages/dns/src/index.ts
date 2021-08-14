require("dotenv").config()

import startApp from "./app"

const {
	PORT_DNS_APP,
	PORT_DNS_API,
	DB_STRING
} = process.env

startApp({
	appPort: PORT_DNS_APP,
	apiPort: PORT_DNS_API,
	dbString: DB_STRING
});