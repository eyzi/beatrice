const dnsd = require("dnsd");
const publicIp = require("public-ip");
import { Repository } from "@beatrice/common";
import { Record, RecordQuery, Question, ZoneData } from "../types";
import createAnswer from "../services/createAnswer";
import queryRecord from "../services/queryRecord";

const registerSOA = async (
  dnsServer: any,
  repository?: Repository<Record, RecordQuery>
) =>
  !repository
    ? []
    : queryRecord(repository, { type: "SOA" }).then((records) =>
        records.map((record) => {
          const { mname, rname, serial, refresh, retry, expire, ttl } =
            record.data as ZoneData;
          dnsServer.zone(
            record.name,
            mname,
            rname,
            serial,
            refresh,
            retry,
            expire,
            ttl
          );
        })
      );

const getQuestionType = (questionArray: Question[]) => {
  return questionArray?.[0]?.type || "SOA";
};

const mapAnswers = (questionName: string) => (records: Record[]) =>
  records.map((record) => ({
    ...record,
    name: questionName,
  }));

const handleQuestion = async (
  question: RecordQuery,
  repository?: Repository<Record, RecordQuery>
) => {
  if (!repository) return [];
  return createAnswer(repository, question.name as string, question.type).then(
    mapAnswers(question.name as string)
  );
};

const requestHandler =
  (repository: Repository<Record, RecordQuery>) =>
  async (req: any, res: any) => {
    const publicIpV4 = await publicIp.v4();

    const questionArray: any = req.questions || req.question;
    const questionType: string = getQuestionType(questionArray);

    // let dnsd handle SOA requests
    if (questionType.toUpperCase() === "SOA") {
      return res.end();
    }

    let answerArray: Record[] = [];
    for (const question of questionArray) {
      const rawAnswers = await handleQuestion(question, repository).catch(
        (error: any) => {
          console.error({
            error,
            req,
            message: `Error while handling question`,
            question,
          });
        }
      );
      if (rawAnswers) rawAnswers.map((answer) => answerArray.push(answer));
    }

    // to avoid hitting UDP limit, only send the latest 4 answers
    const cleanAnswerArray = answerArray.reverse().slice(0,4);
    for (let answer of cleanAnswerArray) {
      let { name, type, ttl, data } = answer;
      if (data) {
        if (typeof data === "string" && publicIpV4)
          data = data.replace(/%PUBLIC_IP%/i, publicIpV4);
        console.log({ name, type, ttl, data });
        res.answer.push({ name, type, ttl, data });
      }
    }

    return res.end();
  };

const createDnsdServer = (handler: ReturnType<typeof requestHandler>) => {
  return dnsd.createServer(handler)
}

export default (port: string, repository: Repository<Record, RecordQuery>) => {
  let server = createDnsdServer(requestHandler(repository));
  registerSOA(server, repository);
  server.on("close", () => {
    server = createDnsdServer(requestHandler(repository));
  })
  server.on("error", (message: string | object) => {
    console.error(message);
  });
  server.timeout = 0;
  server.listen(port, "0.0.0.0", () => {
    console.log(`DNS Service running at ${port}`);
  });
  return server;
};
