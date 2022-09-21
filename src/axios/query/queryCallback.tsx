import { useState } from 'react'
import { AxiosReqConfig, QueryMethod } from '../base'
import returnAxios from '../returnAxios'
import { FunctionCallback, FunctionCallbackReturn, ArgsCallback } from '../base'

export type QueryFunctionCallback = FunctionCallback<
  QueryMethod,
  ArgsCallback<QueryMethod>
>

const QueryCallback: QueryFunctionCallback = (
  urlArg?: string,
  config?: AxiosReqConfig
) => {
  const axios = returnAxios()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState(null)

  const queryFunc: FunctionCallbackReturn<ArgsCallback<QueryMethod>> = ({
    url,
    onCompleted,
    onError,
  }) => {
    setLoading(true)

    const urlAxios = urlArg ? urlArg : url ? url : ''

    axios
      .get(urlAxios, config)
      .then(({ data }) => {
        setLoading(false)
        setData(data)
        if (onCompleted) {
          onCompleted(data)
        }
      })
      .catch((error) => {
        setLoading(false)
        setError(error)
        if (onError) {
          onError(error)
        }
      })
  }

  return [queryFunc, { loading, data, error }]
}

export default QueryCallback
