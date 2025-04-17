import { Arquivo, ArquivoBase64 } from "./arquivo";
import { Categoria } from "./categoria";

export interface Tema {
  id: number;
  idArquivo: number;
  descricao: string;
  corPrimaria?: string;
  corSecundaria?: string;
  corTerciaria?: string;
  arquivo?: Arquivo;
  arquivoBase64?: ArquivoBase64;

  temaCategoria?: TemaCategoria[];
  listIdCategoria?: number[];

}



export interface TemaCadastro {
  file?: any;
  id?: number;
  descricao: string;
  corPrimaria?: string;
  corSecundaria?: string;
  corTerciaria?: string;
  listIdCategoria: number[];
}

export interface TemaCategoria {
  id: number;
  idTema: number;
  idCategoria: number;
  categoria?: Categoria;

}



