import axios from "axios";
import { useAuthStore } from "../store/auth";

const axiosInstance = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/v1/api",
  withCredentials: true, // sends the httpOnly session cookie automatically — replaces your old Bearer header
});

// Auto-refresh the session on a 401, then retry the original request once.
let isRefreshing = false;
/**
 * @type {{ resolve: (value: any) => void; reject: (reason?: any) => void; }[]}
 */
let queue = [];

const flushQueue = (/** @type {unknown} */ error) => {
  // @ts-ignore
  queue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve()));
  queue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthRoute =
      originalRequest.url?.includes("/auth/signin") ||
      originalRequest.url?.includes("/auth/refresh-session");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => queue.push({ resolve, reject })).then(() =>
          axiosInstance(originalRequest)
        );
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post("/auth/refresh-session");
        flushQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        flushQueue(refreshError);
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;