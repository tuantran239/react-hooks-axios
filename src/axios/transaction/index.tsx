import { useState } from "react";
import { useMutation } from '../mutation';
import { useQuery } from '../query';
import Transaction from "./Transaction";

type Return = {
  onRun: (transaction: Transaction) => Promise<void>;
  onError?: (error: any) => void;
};

type FunctionChild<T> = (args: T) => Promise<void>;

type FunctionTransaction<T> = () => [
  func: FunctionChild<T>,
  process: { loading?: boolean; error?: any }
];

export const useTransaction: FunctionTransaction<Return> = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { axios,  mutationAsyncThrowError } = useMutation();
  const { queryAsyncThrowError } = useQuery();

  const query = queryAsyncThrowError;
  const mutation = mutationAsyncThrowError;

  const transactionFunc: FunctionChild<Return> = async ({ onRun, onError }) => {
    setLoading(true);
    try {
      await onRun(new Transaction(axios, query, mutation));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
      if (onError) {
        onError(error);
      }
    }
  };

  return [transactionFunc, { loading, error }];
};
