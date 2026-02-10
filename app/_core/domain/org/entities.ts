export type CompanyProps = { id: string; code: string; name: string; active:boolean };




export type BranchProps = {
  id: string;
  companyId: string;
  code: string;
  externalCode: string;
  active:boolean;
  name: string;
  timezone: string;
};
