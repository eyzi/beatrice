const fetch = require("node-fetch")
import {
	Id
} from "@beatrice/common"

export default (
	url: string
) => async (
	certificateId: Id
) => fetch(`http://${ url }/${ certificateId }`, { method: "POST" })