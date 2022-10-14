import { useState } from 'react'
import { AxiosReqConfig, Method } from '../base'
import returnAxios from '../returnAxios'
import { FunctionCallback, FunctionCallbackReturn, ArgsCallback } from '../base'

interface Args extends ArgsCallback<Method> {
  body?: any
}

export type AxiosFunctionCallback = FunctionCallback<Method, Args>

const Callback: AxiosFunctionCallback = (
  urlArg?: string,
  config?: AxiosReqConfig
) => {
  const axios = returnAxios()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState(null)

  const axiosFunc: FunctionCallbackReturn<Args> = ({
    method,
    url,
    body,
    onCompleted,
    onError,
  }) => {
    setLoading(true)
    const urlAxios = urlArg ? urlArg : url ? url : ''
    if (method === 'delete' || method === 'get') {
      axios[method](urlAxios, config)
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
    } else {
      axios[method](urlAxios, body || {}, config)
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
  }

  return [axiosFunc, { loading, data, error }]
}

export default Callback
