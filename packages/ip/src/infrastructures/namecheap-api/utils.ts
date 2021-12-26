import axios from "axios";
import { parseStringPromise } from "xml2js";

export const getDomainLevels = (domain: string) => domain.split(".");

export const extractCommandResponse =
  (command: string) => async (apiResponse: any) =>
    apiResponse.CommandResponse.find((c: any) => c.$.Type === command);

export const callApi = async (url: string, params: object) =>
  axios
    .get(url, { params })
    .then((response) => parseStringPromise(response.data))
    .then((response) => response.ApiResponse);
