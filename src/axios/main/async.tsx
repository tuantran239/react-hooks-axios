import { AxiosRequestConfig } from 'axios'
import { AxiosReqConfig, Method } from '../base'
import returnAxios from '../returnAxios'
import {
  FunctionAsyncReturnError,
  FunctionAsyncThrowError,
  Return,
} from '../utils/functionAsync'

type AsyncReturn = (
  url: string,
  method: Method,
  body?: any,
  config?: AxiosReqConfig
) => Promise<Partial<Return<any>>>

type AsyncThrow = (
  url: string,
  method: Method,
  body?: any,
  config?: AxiosReqConfig
) => Promise<any>

export type AxiosAsyncFunction = {
  asyncReturn: AsyncReturn
  asyncThrow: AsyncThrow
}

function axiosAsync(): AxiosAsyncFunction {
  const axios = returnAxios()

  const asyncReturn = (
    url: string,
    method: Method,
    body?: any,
    config?: AxiosReqConfig
  ) =>
    FunctionAsyncReturnError<any>(async () => {
      if (method === 'delete' || method === 'get') {
        const { data } = await axios[method](url, config)
        return data
      }
      const { data } = await axios[method](url, body ?? {}, config)
      return data
    })

  const asyncThrow = (
    url: string,
    method: Method,
    body?: any,
    config?: AxiosRequestConfig
  ) =>
    FunctionAsyncThrowError<any>(async () => {
      if (method === 'delete' || method === 'get') {
        const { data } = await axios[method](url, config)
        return data
      }
      const { data } = await axios[method](url, body ?? {}, config)
      return data
    })

  return { asyncThrow, asyncReturn }
}

export default axiosAsync
