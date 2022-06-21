import { createContext } from "react";
import axiosRoot, { AxiosStatic } from "axios";

type AxiosInitial = {
  axios: AxiosStatic;
};

type PropsType = {
  children: React.ReactNode;
  axios?: AxiosStatic;
};

const axiosContext = createContext<AxiosInitial>({
  axios: axiosRoot,
});

export const AxiosProvider = ({ children, axios }: PropsType) => {
  return (
    <axiosContext.Provider value={{ axios: axios ? axios : axiosRoot }}>
      {children}
    </axiosContext.Provider>
  );
};

export default axiosContext;
