import axios from "axios";
import { getToken } from "../localstorage";

function Interceptors(instance) {
  instance.Interceptors.request.use(
    (config) => {
      const { access_token } = getToken();
      if (config.headers && access_token)
        config.headers.Authorization = `Bearer ${access_token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
}

//토큰이 필요한 instance
const authCreateInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 2000,
    headers: { "Content-Type": "application/json" },
  });
  return Interceptors(instance, true);
};
const authRequest = authCreateInstance();

//토큰이 필요없는 instance
const authAPI = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 2000,
  headers: { "Content-Type": "application/json" },
});

export { authAPI, authRequest };
