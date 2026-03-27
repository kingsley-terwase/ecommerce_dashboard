import { useCallback } from "react";
import { api } from "./api";
import { useNotification } from "@/contexts/notification";

/**
 * @typedef {Object} RequestOptions
 * @property {string} [pin]
 * @property {(error: any) => unknown} [onError]
 * @property {() => void} [onFinally]
 * @property {boolean} [rethrow]
 */

/**
 * @template {(...args: any[]) => Promise<any>} T
 * @typedef {(...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | undefined>} WrappedFn
 */

/**
 * @typedef {Object} UseRequestReturn
 * @property {<T extends (...args: any[]) => Promise<any>>(fn: T, options?: RequestOptions) => WrappedFn<T>} request
 */

/**
 * @returns {UseRequestReturn}
 */
export const useRequest = () => {
  const notify = useNotification();

  const wrapper = useCallback(
    /**
     * @template {(...args: any[]) => Promise<any>} T
     * @param {T} fn
     * @param {RequestOptions} [options]
     * @returns {WrappedFn<T>}
     */
    (fn, options = {}) => {
      /** @type {number | null} */
      let interceptorId = null;

      const wrapped = async (/** @type {Parameters<T>} */ ...args) => {
        if (options.pin) {
          interceptorId = api.interceptors.request.use((/** @type {any} */ config) => {
            config.headers = {
              ...config.headers,
              "Account-Password": options.pin,
            };
            return config;
          });
        }

        try {
          return await fn(...args);
        } catch (/** @type {any} */ error) {
          console.error("api error -> ");
          console.error(error?.response);

          const message = error?.response?.data?.message;

          if (error?.code === "ERR_NETWORK") {
            notify.info("No Internet! Try Again. 😕");
            return;
          }

          const method = error?.config?.method?.toUpperCase?.();
          if (options.onError) {
            const errorResult = options.onError(error);
            if (errorResult !== undefined) {
              return errorResult;
            }
          } else if (method !== "GET") {
            notify.error(message || "A technical error occured! Try again. 😬");
          }

          if (options.rethrow) return Promise.reject(error);
        } finally {
          if (interceptorId !== null) {
            api.interceptors.request.eject(interceptorId);
          }

          if (options.onFinally) options.onFinally();
        }
      };

      return wrapped;
    },
    [],
  );

  return { request: wrapper };
};
