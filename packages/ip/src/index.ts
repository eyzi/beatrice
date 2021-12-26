require("dotenv").config();

import app from "./app";

const { NAMECHEAP_APIKEY, NAMECHEAP_USERNAME, SCHEDULE } = process.env;

if (NAMECHEAP_APIKEY && NAMECHEAP_USERNAME) {
  app(NAMECHEAP_APIKEY, NAMECHEAP_USERNAME, SCHEDULE);
}
