import { useContext } from "react";
import axiosContext from ".";

const ReturnAxios = () => {
  const { axios } = useContext(axiosContext);
  return axios;
};

export default ReturnAxios;
