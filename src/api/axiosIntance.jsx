import axios from "axios";
import queryString from "query-string";

import apiConfig from "./apiConfig";

const axiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    accept: "application/json",
  },
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

axiosInstance.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
);

export default axiosInstance;
