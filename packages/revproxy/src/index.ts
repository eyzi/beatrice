require("dotenv").config()

import startApp from "./app"

const {
	PORT_REVPROXY_APP,
	PORT_REVPROXY_API,
	PORT_REVPROXY_HTTP,
	PORT_REVPROXY_HTTPS,
	CERT_DIR,
	DB_STRING
} = process.env

startApp({
	apiPort: PORT_REVPROXY_API,
	httpPort: PORT_REVPROXY_HTTP,
	httpsPort: PORT_REVPROXY_HTTPS,
	certDir: CERT_DIR,
	dbString: DB_STRING
});