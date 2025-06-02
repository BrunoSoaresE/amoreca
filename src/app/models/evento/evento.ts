import { Tema } from "../tema";
import { EventoArquivo, EventoArquivoCadastro } from "./evento-arquivo";
import { EventoPresente } from "./evento-presente";
import { EventoRecado } from "./evento-recado";

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
  linkSite?: string;

  criadoEm: Date;
  atualizadoEm: Date;

  // Relacionamentos
  tema?: Tema;
  eventoArquivo?: EventoArquivo[];
  eventoPresente?: EventoPresente[];
  eventoRecado?: EventoRecado[];
}





export interface EventoCadastro {
  id?: number;
  idTema: number;
  subNomeEvento?: string;
  nomeEvento: string;
  linkSite?: string;
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

  eventoPresente?: EventoPresente[];
  eventoArquivo?: EventoArquivoCadastro[];
  removerArquivos?: number[];
}




