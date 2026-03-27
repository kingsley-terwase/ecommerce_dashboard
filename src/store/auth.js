import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * @typedef {Record<string, any>} User
 */

/**
 * @typedef {Record<string, any>} Permission
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user - The currently authenticated user
 * @property {string|null} token - The authentication token
 * @property {Permission|null} permission - The authenticated user permissions
 * @property {function({ user: User, token: string, permission: Permission }): void} setAuth - Sets the authenticated user and token
 * @property {function(): void} clearAuth - Clears the authenticated user and token
 */

/** @type {import('zustand').StoreApi<AuthState>} */
export const useAuthStore = create(
  persist(
    (set) => ({
      /** @type {User|null} */
      user: null,

      /** @type {string|null} */
      token: null,

      /** @type {Permission|null} */
      permission: null,

      /** @param {{ user: User, token: string, permission: Permission }} auth */
      setAuth: ({ user, token, permission }) =>
        set({
          user,
          token,
          permission,
        }),

      clearAuth: () =>
        set({
          user: null,
          token: null,
        }),
    }),
    {
      name: "bmg_auth_user",
    },
  ),
);
