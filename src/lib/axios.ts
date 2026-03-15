import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_BACKEND_API_URL
    : import.meta.env.VITE_BACKEND_API_DEV_URL,
  withCredentials: true,
});
