export interface Login {
  email: string;
  senha: string;
}
export interface PessoaLogin {
  bearer: string;
}

export interface Pessoa {
  id: number;
  nome: string;
  documento: string;
  email: string;
}
