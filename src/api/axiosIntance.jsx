import axios from "axios";
import queryString from "query-string";

import apiConfig from "./apiConfig";

const axiosIntance = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTFjY2MxZjIzZWQ2YTMzYWQ4NmNlZDIzOGMzZTc3MCIsIm5iZiI6MTc0NTEyMzA0NS45MTgwMDAyLCJzdWIiOiI2ODA0NzZlNTAzMzQ0YWVlNzA4OWJmNTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QCu3J1Dv5sbYngPhGD2ETQizTFRQ1dwTVTdz8w_-6ck",
  },
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

axiosIntance.interceptors.request.use(async (config) => config);

axiosIntance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosIntance;
