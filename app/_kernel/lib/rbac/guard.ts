import type { Permission, Role } from "./types";
import { ROLE_PERMISSIONS } from "./matrix";
import {
  SERVIDOR_ASIDE,
  ADMINISTRADOR_ASIDE,
  GESTOR_ASIDE,
  MASTER_ASIDE,
} from "../nav/asides_perfis";

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
  return ["SERVIDOR", "GESTOR", "ADMINISTRADOR", "MASTER"].includes(value);
}

export const ASIDE_BY_ROLE: Record<Role, typeof MASTER_ASIDE> = {
  SERVIDOR: SERVIDOR_ASIDE,
  GESTOR: GESTOR_ASIDE,
  ADMINISTRADOR: ADMINISTRADOR_ASIDE,
  MASTER: MASTER_ASIDE,
};
