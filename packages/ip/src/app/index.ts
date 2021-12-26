const nodeSchedule = require("node-schedule");
import syncNsIp from "../services/syncNsIp";

const app = async (apiKey: string, username: string, schedule?: string) => {
  const apiConfig = {
    baseUrl: "api.namecheap.com/xml.response",
    apiKey: apiKey,
    username: username,
  };

  await syncNsIp(apiConfig);
  if (schedule) {
    nodeSchedule.scheduleJob(schedule, async () => {
      await syncNsIp(apiConfig);
    });
  }
};

export default app;
