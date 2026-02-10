import { Permission, Role } from "../rbac/types";

export type NavItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  labelBreadCrumb?: string;
  description?: string;

  //RBA: se não declarar, item é público (dentro do privado)
  allowRoles?: Role[];
  require?: Permission[]; //precisa ter todas
  requireAny?: Permission[]; //precisa ter pelos menos 1

  //subitens (se existir, vira grupo)
  children?: NavItem[];

  //matching
  exact?: boolean;
};

export type AsideConfig = {
  title?: string;
  icon?: React.ReactNode;
  items: NavItem[];
};
