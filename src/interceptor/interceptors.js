import axios from "axios";
import { redirect } from "react-router-dom";
import { persistor, store } from "@/redux/store";
import { decodeAndValidateToken } from "@/lib/token";
import { TYPE_LOGOUT } from "@/constants/actionTypeConstants";
import LocalStorageRepository, { deleteUserInfo } from "@/lib/storage";
import { handleErrorToast } from "@/lib/error";
import { logMessage } from "@/constants/logMessage";

// Function to log messages in development mode
const logOnDev = (message) => {
  if (import.meta.env.VITE_APP_ENV === "development") {
    console.log(message);
  }
};

// Interceptor for request handling
const onRequest = (config) => {
  const { method, url } = config;
  const accessToken = LocalStorageRepository.get("access_token");
  
  const { isValidToken } = decodeAndValidateToken(accessToken)

  // Attach authorization headers if token exists
  if (accessToken && isValidToken) {
    config.headers["Authorization"] = `API-Key ${accessToken}`;
  }

  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);

  return config;
};

// Interceptor for response handling
const onResponse = (response) => {
  const { method, url } = response.config;
  const { status } = response;

  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);

  return response;
};

// Error handling function for response errors
const onResponseError = async (error) => {
  if (axios.isAxiosError(error)) {
    handleErrorToast(error);
    const { method, url } = error.config || {};
    const { status, message } = error.response || {};

    logOnDev(
      `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`
    );

    // Handle response error statuses
    switch (status) {
      case 400:
        logOnDev(logMessage.BAD_REQUEST);
        break;
      case 401:
        logOnDev(logMessage.UN_AUTHORIZED);
        store.dispatch({ type: TYPE_LOGOUT });
        persistor.purge();
        deleteUserInfo();
        redirect('/');
        break;
      case 403:
        logOnDev(logMessage.PERMISSION_DENIED);
        break;
      case 404:
        logOnDev(logMessage.INVALID_REQUEST);
        break;
      case 500:
        logOnDev(logMessage.SERVER_ERROR);
        break;
      default:
        logOnDev(logMessage.UNKNOWN_ERROR);
        break;
    }
  } else {
    logOnDev(`🚨 [API] | Response Error ${error.message}`);
  }

  return await Promise.reject(error);
};

// Function to set up interceptors for an Axios instance
export const setupInterceptors = (instance) => {
  // Attach request and response interceptors to the instance with separate error handling functions
  instance.interceptors.request.use(onRequest, onResponseError);
  instance.interceptors.response.use(onResponse, onResponseError);

  return instance;
};
