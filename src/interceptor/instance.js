import { toastMessage } from "@/constants/toastMessage";
import axios from "axios";

const mainAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_BASE_URL,
  timeout: 10000,
  timeoutErrorMessage: toastMessage.SERVER_NOT_RESPONDING,
});

export default mainAxiosInstance;
