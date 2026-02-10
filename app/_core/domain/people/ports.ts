export type EmployeeProps = {
  id: string;
  companyId: string;
  branchId: string;
  email: string;
  name: string;
  matricula?: string | null;
  sarhUf?: string | null;
};

export interface EmployeeRepository {
  create(data: Omit<EmployeeProps, "id">): Promise<EmployeeProps>;
  listByCompany(companyId: string): Promise<EmployeeProps[]>;
}
