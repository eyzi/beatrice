const schedule = require("node-schedule")
import {
	persistenceGetAll
} from "@beatrice/common"
import { RetrievableAll } from "@beatrice/common/src"
import { AcmeAccount } from "../types"

export default (
	cron: string,
	renewer: any,
	accountRepository: RetrievableAll<AcmeAccount>
) => {
	const job = schedule.scheduleJob(cron, async () => {
		await persistenceGetAll(accountRepository)().then((accounts: AcmeAccount[]) => accounts.map(renewer))
	})
}