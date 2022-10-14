import { AxiosRequestConfig } from 'axios'
import { useState } from 'react'
import { Method } from '../base'
import { useAxios } from '../main'

export type AxiosAsync = (
  url: string,
  method: Method,
  body?: any,
  config?: AxiosRequestConfig
) => Promise<any>

type Return = {
  onRun: (axios: AxiosAsync) => Promise<void>
  onError?: (error: any) => void
}

type FunctionChild<T> = (args: T) => Promise<void>

type FunctionMulti<T> = () => [
  func: FunctionChild<T>,
  process: { loading?: boolean; error?: any }
]

export const useAxiosMulti: FunctionMulti<Return> = () => {
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const { asyncThrow } = useAxios()

  const multiFunc: FunctionChild<Return> = async ({ onRun, onError }) => {
    setLoading(true)
    try {
      await onRun(asyncThrow)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error)
      if (onError) {
        onError(error)
      }
    }
  }

  return [multiFunc, { loading, error }]
}
