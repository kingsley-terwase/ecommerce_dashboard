import { useAuthStore } from "@/store/auth";

export function usePermission() {
  const { permission } = useAuthStore.getState();
  const userPermissions = permission?.permissions;
  if (!userPermissions) return false;

  /** @param {string} permission */
  function hasThis(permission) {
    return Boolean(userPermissions?.[permission]);
  }

  /** @param {Array<string>} permissions */
  function hasAll(permissions) {
    return permissions.every((p) => userPermissions?.[p]);
  }

  /** @param {Array<string>} permissions */
  function hasAny(permissions) {
    return permissions.some((p) => userPermissions?.[p]);
  }

  return { hasThis, hasAll, hasAny };
}
