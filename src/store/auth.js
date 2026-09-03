// @ts-nocheck
import { create } from "zustand";
import { persist } from "zustand/middleware";

/** @typedef {Record<string, any>} User */
/** @typedef {{ role: string }} Permission */

/** @type {import('zustand').StoreApi<{user: User|null, permission: Permission|null, isAuthenticated: boolean, setAuth: Function, clearAuth: Function}>} */
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      permission: null,
      isAuthenticated: false,

      setAuth: ({ user, permission }) => set({ user, permission, isAuthenticated: true }),
      clearAuth: () => set({ user: null, permission: null, isAuthenticated: false }),
    }),
    { name: "tetyhub_auth_user" }
  )
);