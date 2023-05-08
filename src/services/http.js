import axios from "axios";

const DEFAULT_TIMEOUT = 10 * 1000
const BASE_URL = `${import.meta.env.VITE_APP_API}`

const errorHandler = (error) => {
  const { response } = error;
  if (response) return Promise.reject(response);
  // network error handler
  else if (!window.navigator.onLine) console.error("Network error")
};

const $axios = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
});

$axios.interceptors.response.use((res) => res.data, errorHandler)

export { $axios }