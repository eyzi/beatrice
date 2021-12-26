const nodeSchedule = require("node-schedule");
import syncNsIp from "../services/syncNsIp";

const app = async (
  domain: string,
  apiKey: string,
  username: string,
  schedule?: string
) => {
  const apiConfig = {
    baseUrl: "api.namecheap.com/xml.response",
    apiKey: apiKey,
    username: username,
  };

  await syncNsIp(apiConfig, domain);
  if (schedule) {
    nodeSchedule.scheduleJob(schedule, async () => {
      await syncNsIp(apiConfig, domain);
    });
  }
};

export default app;
