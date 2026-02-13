export type AfdDTO = {
  id: string;
  name: string;
  lenght: string;
  status: string;
};

export type ResultSearchTenantProps = {
  data: AfdDTO[] | null;
  count: number;
  currentPage: number;
  totalPages: number;
};
