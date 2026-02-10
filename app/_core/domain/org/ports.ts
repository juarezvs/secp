import { BranchProps, CompanyProps } from "./entities";

export interface CompanyRepository {
  create(data: Omit<CompanyProps, "id">): Promise<CompanyProps>;
  list(): Promise<CompanyProps[]>;
}

export interface BranchRepository {
  create(data: Omit<BranchProps, "id">): Promise<BranchProps>;
}
