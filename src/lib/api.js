import { useAuthStore } from "@/store/auth";
import axios from "axios";
import { notification } from "./notification";

export const api = axios.create({
  baseURL: "http://localhost:4000/V1/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (error?.code === "ERR_NETWORK") {
      notification.info("Connection error, try again! 😕");
      return Promise.reject(error);
    }

    if (status === 401) {
      const { clearAuth } = useAuthStore.getState();
      clearAuth();

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      notification.error("Session expired. Login again. 😬");
    }

    if (status === 403) {
      const message = error?.response?.data?.message || "Access denied";
      notification.error(`${message} 😒`);
    }

    return Promise.reject(error);
  },
);
