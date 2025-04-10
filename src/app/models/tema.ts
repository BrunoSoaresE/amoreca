import { Arquivo } from "./arquivo";

export interface Tema {
  id: number;
  idArquivo: number;
  descricao: string;
  corPrimaria?: string;
  corSecundaria?: string;
  corTerciaria?: string;
  arquivo?: Arquivo;
}