import type { Permission, Role } from "./types";
import { ROLE_PERMISSIONS } from "./matrix";

export const hasPermission = (role: Role, perm: Permission) => {
  return ROLE_PERMISSIONS[role]?.includes(perm) ?? false;
};

export const hasAny = (role: Role, perm: Permission[]) => {
  return perm.some((p) => hasPermission(role, p));
};

export const hasAll = (role: Role, perms: Permission[]) => {
  return perms.every((p) => hasPermission(role, p));
};
