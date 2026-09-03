export const ROLES = {
  ADMIN: "super_admin",
  SELLER: "vendor",
  CUSTOMER: "customer",
};

/**
 * @param {{ role?: string }} permission
 */
export function getRoleKey(permission) {
  const role = permission?.role;
  if (role === ROLES.ADMIN) return "super_admin";
  if (role === ROLES.SELLER) return "vendor";
  if (role === ROLES.CUSTOMER) return "customer";
  return null;
}

/**
 * @param {{ role?: string }} permission
 */
export function getRoleBasePath(permission) {
  const role = getRoleKey(permission);
  if (role === "vendor") return "/dashboard/seller";
  if (role === "customer") return "/account";
  if (role === "super_admin") return "/dashboard/admin";
  return "/login";
}