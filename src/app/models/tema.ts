import { Arquivo } from "./arquivo";

export interface Tema {
  id: number;
  idArquivo: number;
  corPrimaria?: string;
  corSecundaria?: string;
  corTerciaria?: string;
  arquivo?: Arquivo;
}