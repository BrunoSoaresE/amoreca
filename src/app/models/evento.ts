import { EventoArquivo, EventoArquivoCadastro } from "./evento-arquivo";
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
  linkSite?: string;

  criadoEm: Date;
  atualizadoEm: Date;

  // Relacionamentos
  tema?: Tema;
  eventoArquivo?: EventoArquivo[];

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

  eventoArquivo?: EventoArquivoCadastro[];
  removerArquivos?: number[];
}




