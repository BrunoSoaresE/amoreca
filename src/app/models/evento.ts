import { Tema } from "./tema";

export interface Evento {
  id: number;
  idPessoa: number;
  idTema: number;

  subNomeEvento?: string;
  nomeEvento: string;
  titulo?: string;
  texto?: string;
  dataEvento?: Date;
  dataFimEvento?: Date;
  infoEvento?: string;
  cep?: string;
  estado?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  textoRodape?: string;

  criadoEm: Date;
  atualizadoEm: Date;

  // Relacionamentos
  tema?: Tema;
}





export interface EventoCadastro {
  id?: number;
  idTema: number;
  subNomeEvento?: string;
  nomeEvento: string;
  titulo?: string;
  texto?: string;
  dataEvento?: Date;
  dataFimEvento?: Date;
  infoEvento?: string;
  cep?: string;
  estado?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  textoRodape?: string;
}




