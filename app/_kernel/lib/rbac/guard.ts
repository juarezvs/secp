import type { Permission, Role } from "./types";
import { ROLE_PERMISSIONS } from "./matrix";
import {
  ADMIN_ASIDE,
  GESTOR_ASIDE,
  MASTER_ASIDE,
  RH_ASIDE,
  SERVIDOR_ASIDE,
} from "../nav/asides";

export const hasPermission = (role: Role, perm: Permission) => {
  return ROLE_PERMISSIONS[role]?.includes(perm) ?? false;
};

export const hasAny = (role: Role, perm: Permission[]) => {
  return perm.some((p) => hasPermission(role, p));
};

export const hasAll = (role: Role, perms: Permission[]) => {
  return perms.every((p) => hasPermission(role, p));
};

export function isRole(value: string): value is Role {
  return ["SERVIDOR", "GESTOR", "ADMIN", "MASTER", "RH"].includes(value);
}

export const ASIDE_BY_ROLE: Record<Role, typeof MASTER_ASIDE> = {
  SERVIDOR: SERVIDOR_ASIDE,
  GESTOR: GESTOR_ASIDE,
  ADMIN: ADMIN_ASIDE,
  MASTER: MASTER_ASIDE,
  RH: RH_ASIDE,
};
