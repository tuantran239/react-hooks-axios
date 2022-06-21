import { useState } from "react";
import { AxiosReqConfig, MutationMethod } from "../base";
import returnAxios from "../returnAxios";
import {
  FunctionCallback,
  FunctionCallbackReturn,
  ArgsCallback,
} from "../base";

interface Args extends ArgsCallback<MutationMethod> {
  body: any;
}

export type MutationFunctionCallback = FunctionCallback<MutationMethod, Args>;

const MutationCallback: MutationFunctionCallback = (
  url: string,
  config?: AxiosReqConfig
) => {
  const axios = returnAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState(null);

  const mutationFunc: FunctionCallbackReturn<Args> = ({
    method,
    body,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    if (method && method === "delete") {
      axios
        .delete(url, config)
        .then(({ data }) => {
          setLoading(false);
          setData(data);
          if (onCompleted) {
            onCompleted(data);
          }
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response?.data);
          if (onError) {
            onError(error.response?.data);
          }
        });
    } else {
      axios[method ?? "post"](url, body ?? {}, config)
        .then(({ data }) => {
          setLoading(false);
          setData(data);
          if (onCompleted) {
            onCompleted(data);
          }
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response?.data);
          if (onError) {
            onError(error.response?.data);
          }
        });
    }
  };

  return [mutationFunc, { loading, data, error }];
};

export default MutationCallback;
