import axios from "axios";
import { useAuthStore } from "../store/auth";

const axiosInstance = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/v1/api",
  withCredentials: true,
});

// Attach the CSRF token to every state-changing request. It's not a cookie
// (backend returns it in the login response body), so axios can't auto-send
// it — we read it from the store ourselves on every request.
axiosInstance.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();
  // @ts-ignore
  const isMutating = ["post", "put", "patch", "delete"].includes(method);

  if (isMutating) {
    const csrfToken = useAuthStore.getState().csrfToken;
    if (csrfToken) {
      config.headers["x-csrf-token"] = csrfToken;
    }
  }

  return config;
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
        const refreshResponse = await axiosInstance.post("/auth/refresh-session");

        // ⚠️ Unconfirmed: does refresh-session also rotate and return a new
        // csrfToken? If your backend does, this picks it up automatically.
        // If refresh-session's response doesn't include one, this is a
        // harmless no-op and the old token keeps being used.
        const newCsrfToken = refreshResponse.data?.result?.csrfToken;
        if (newCsrfToken) {
          useAuthStore.getState().setCsrfToken(newCsrfToken);
        }

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