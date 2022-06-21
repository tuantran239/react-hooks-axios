import { AxiosRequestConfig } from "axios";
import {
  AxiosReqConfig,
} from "../base";
import ReturnAxios from "../returnAxios";
import {
  FunctionAsyncReturnError,
  FunctionAsyncThrowError,
  Return,
} from "../utils/functionAsync";

type QueryAsyncReturnError = (
  url: string,
  config?: AxiosReqConfig
) => Promise<Partial<Return<any>>>;

type QueryAsyncThrowError = (
  url: string,
  config?: AxiosReqConfig
) => Promise<any>;

export type QueryAsyncReturn = {
  queryAsyncReturnError: QueryAsyncReturnError;
  queryAsyncThrowError: QueryAsyncThrowError;
};

function queryAsync(): QueryAsyncReturn {
  const axios = ReturnAxios();
  const queryAsyncReturnError = (
    url: string,
    config?: AxiosReqConfig
  ) =>
    FunctionAsyncReturnError<any>(async () => {
      const { data } = await axios.get(url, config);
      return data;
    });

  const queryAsyncThrowError = (
    url: string,
    config?: AxiosRequestConfig
  ) =>
    FunctionAsyncThrowError<any>(async () => {
      const { data } = await axios.get(url, config);
      return data;
    });

  return { queryAsyncReturnError, queryAsyncThrowError };
}

export default queryAsync;
