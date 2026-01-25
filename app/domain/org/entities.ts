export type CompanyProps = { id: string; code: string; name: string };
export type BranchProps = {
  id: string;
  companyId: string;
  code: string;
  name: string;
  timezone: string;
};
