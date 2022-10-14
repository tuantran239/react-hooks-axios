import {
  AxiosProxyConfig,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios'

export type Method = 'post' | 'put' | 'patch' | 'delete' | 'get'

export interface AxiosReqConfig {
  baseURL?: string
  headers?: AxiosRequestHeaders
  params?: any
  proxy?: AxiosProxyConfig | false
}

export interface ArgsCallback<T> {
  url?: string
  method: T
  onCompleted?: (data: any) => void
  onError?: (error: any) => void
}

export type FunctionCallbackReturn<T> = (args: T) => void

export type FunctionCallback<K, T extends ArgsCallback<K>> = (
  urlArg?: string,
  config?: AxiosRequestConfig
) => [
  func: FunctionCallbackReturn<T>,
  process: { loading?: boolean; error?: any; data?: any }
]
