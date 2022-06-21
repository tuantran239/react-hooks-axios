import { AxiosRequestConfig } from "axios";
import { AxiosReqConfig, MutationMethod } from "../base";
import returnAxios from "../returnAxios";
import {
  FunctionAsyncReturnError,
  FunctionAsyncThrowError,
  Return,
} from "../utils/functionAsync";

type MutationAsyncReturnError = (
  url: string,
  method?: MutationMethod,
  body?: any,
  config?: AxiosReqConfig
) => Promise<Partial<Return<any>>>;

type MutationAsyncThrowError = (
  url: string,
  method?: MutationMethod,
  body?: any,
  config?: AxiosReqConfig
) => Promise<any>;

export type MutationAsyncReturn = {
  mutationAsyncReturnError: MutationAsyncReturnError;
  mutationAsyncThrowError: MutationAsyncThrowError;
};

function mutationAsync(): MutationAsyncReturn {
  const axios = returnAxios();

  const mutationAsyncReturnError = (
    url: string,
    method?: MutationMethod,
    body?: any,
    config?: AxiosReqConfig
  ) =>
    FunctionAsyncReturnError<any>(async () => {
      if (method && method === "delete") {
        const { data } = await axios.delete(url, config);
        return data;
      }
      const { data } = await axios[method ?? "post"](url, body ?? {}, config);
      return data;
    });

  const mutationAsyncThrowError = (
    url: string,
    method?: MutationMethod,
    body?: any,
    config?: AxiosRequestConfig
  ) =>
    FunctionAsyncThrowError<any>(async () => {
      if (method && method === "delete") {
        const { data } = await axios.delete(url, config);
        return data;
      }
      const { data } = await axios[method ?? "post"](url, body ?? {}, config);
      return data;
    });

  return { mutationAsyncThrowError, mutationAsyncReturnError };
}

export default mutationAsync;
