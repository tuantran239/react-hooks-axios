import axiosAsync from './async'
import axiosCallback from './callback'
import returnAxios from '../returnAxios'

export function useAxios() {
  const axios = returnAxios()
  const { asyncReturn, asyncThrow } = axiosAsync()
  return {
    axios,
    asyncReturn,
    asyncThrow,
    axiosCallback,
  }
}
