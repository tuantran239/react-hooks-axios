import { useEffect, useState } from "react";
import { AxiosReqConfig } from "../base";
import returnAxios from "../returnAxios";

export type QueryReturnType = {
  loading: boolean
  data: any
  error: any
}

const Query = (url: string, config?: AxiosReqConfig): QueryReturnType => {
  const axios = returnAxios();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url, config)
      .then(({ data }) => {
        setLoading(false);
        setData(data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  return { loading, data, error };
};

export default Query;
