import { useState } from 'react'
import { AxiosReqConfig, MutationMethod } from '../base'
import returnAxios from '../returnAxios'
import { FunctionCallback, FunctionCallbackReturn, ArgsCallback } from '../base'

interface Args extends ArgsCallback<MutationMethod> {
  body?: any
}

export type MutationFunctionCallback = FunctionCallback<MutationMethod, Args>

const MutationCallback: MutationFunctionCallback = (
  urlArg?: string,
  config?: AxiosReqConfig
) => {
  const axios = returnAxios()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState(null)

  const mutationFunc: FunctionCallbackReturn<Args> = ({
    method,
    url,
    body,
    onCompleted,
    onError,
  }) => {
    setLoading(true)
    const urlAxios = urlArg ? urlArg : url ? url : ''
    if (method && method === 'delete') {
      axios
        .delete(urlAxios, config)
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
      axios[method ?? 'post'](urlAxios, body || {}, config)
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

  return [mutationFunc, { loading, data, error }]
}

export default MutationCallback
