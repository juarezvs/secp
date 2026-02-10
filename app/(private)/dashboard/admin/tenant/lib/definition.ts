export type TenantDTO = {
  id: string;
  idPai: string | null;
  descricao: string;
  sigla: string;
};

export type ResultSearchTenantProps = {
  data: TenantDTO[] | null;
  count: number;
  currentPage: number;
  totalPage: number;
};
