export type ApiLoginResponse = {
  token: string; // JWT da sua API
  username: string;
  email: string;
  groups: string[];
};

export type ApiLoginDadaServerLogged = {
  matricula: string;
  nome: string;
  nomeSocial?: string | null;
  ativo: boolean;
  cpf: number;
  dataNascimento: Date;
  locatacaoId: number;
  locatacaoPai: number;
  lotacaoDescricao: string;
  lotacaoSigla: string;
  lotacaoTipo: string;
  cargoId: number;
  cargoDescricao: string;
};
