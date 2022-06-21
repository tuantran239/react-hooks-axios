import { useState } from "react";
import { AxiosReqConfig, QueryMethod } from "../base";
import returnAxios from "../returnAxios";
import {
  FunctionCallback,
  FunctionCallbackReturn,
  ArgsCallback,
} from "../base";

export type QueryFunctionCallback = FunctionCallback<
  QueryMethod,
  ArgsCallback<QueryMethod>
>;

const QueryCallback: QueryFunctionCallback = (
  url: string,
  config?: AxiosReqConfig
) => {
  const axios = returnAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState(null);

  const queryFunc: FunctionCallbackReturn<ArgsCallback<QueryMethod>> = ({
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    axios.get(url, config)
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
  };

  return [queryFunc, { loading, data, error }];
};

export default QueryCallback;
