require("dotenv").config();

import startApp from "./app";

const { PORT_FEATURE_API, DB_STRING } = process.env;

startApp({
  apiPort: PORT_FEATURE_API,
  dbString: DB_STRING,
});
