import mutationAsync from "./mutationAsync";
import mutationCallback from "./mutationCallback";
import returnAxios from "../returnAxios";

export function useMutation() {
  const axios = returnAxios();
  const { mutationAsyncReturnError, mutationAsyncThrowError } = mutationAsync();
  return {
    axios,
    mutationAsyncReturnError,
    mutationAsyncThrowError,
    mutationCallback,
  };
}
