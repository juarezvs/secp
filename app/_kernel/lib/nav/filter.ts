import { hasAll, hasAny } from "../rbac/guard";
import type { Role } from "../rbac/types";
import type { AsideConfig, NavItem } from "./types";

const itemAllowed = (item: NavItem, role: Role) => {
  if (item.allowRoles && !item.allowRoles.includes(role)) return false;
  if (item.require && !hasAll(role, item.require)) return false;
  if (item.requireAny && !hasAny(role, item.requireAny)) return false;
  return true;
};

const filterItem = (item: NavItem, role: Role): NavItem | null => {
  if (!itemAllowed(item, role)) return null;

  if (item.children?.length) {
    const children = item.children
      .map((c) => filterItem(c, role))
      .filter(Boolean) as NavItem[];

    //se grupo ficar vázio, remove
    if (children.length === 0) return null;

    return { ...item, children };
  }
  return item;
};

export const filterAside = (config: AsideConfig, role: Role): AsideConfig => {
  return {
    ...config,
    items: config.items
      .map((i) => filterItem(i, role))
      .filter(Boolean) as NavItem[],
  };
};
