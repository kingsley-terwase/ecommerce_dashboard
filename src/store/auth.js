import { create } from "zustand";
import { persist } from "zustand/middleware";

/** @typedef {Record<string, any>} User */
/** @typedef {{ role: string }} Permission */

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      permission: null,
      isAuthenticated: false,
      csrfToken: null, 

      // @ts-ignore
      setAuth: ({ user, permission, csrfToken }) =>
        set({ user, permission, isAuthenticated: true, csrfToken: csrfToken ?? null }),

      // For updating just the token alone, e.g. after a session refresh
      // that rotates it without touching the rest of auth state.
      setCsrfToken: (/** @type {any} */ csrfToken) => set({ csrfToken }),

      clearAuth: () => set({ user: null, permission: null, isAuthenticated: false, csrfToken: null }),
    }),
    { name: "tetyhub_auth_user" }
  )
);