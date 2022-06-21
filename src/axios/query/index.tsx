import returnAxios from "../returnAxios";
import queryAsync from "./queryAsync";
import queryCallback from "./queryCallback";
import query from "./query";

export function useQuery() {
  const axios = returnAxios();
  const { queryAsyncReturnError, queryAsyncThrowError } = queryAsync();
  return {
    axios,
    query,
    queryCallback,
    queryAsyncReturnError,
    queryAsyncThrowError,
  };
}
