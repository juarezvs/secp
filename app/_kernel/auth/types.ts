export type ApiLoginResponse = {
  token: string; // JWT da sua API
  username: string;
  groups: string[];
};

export type ApiLoginDadaServerLogged = {
  matricula: string;
  nome: string;
  ativo: boolean;
  cpfServidor: {
    dados: {
      cpf: string;
      cracha: string;
      altura: string;
      dataNascimento: Date;
    };
  };
  lotacao: {
    lotacao: {
      id: number;
      idPai: number;
      descricao: string;
      sigla: string;
      email: string;
      tipo: {
        id: number;
        nome: string;
      };
    };
    cargo: {
      id: number;
      cargoDescricao: string;
    };
  };
};
