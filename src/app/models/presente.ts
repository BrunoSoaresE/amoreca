import { Arquivo, ArquivoBase64 } from "./arquivo";
import { Categoria } from "./categoria";

export interface Presente {
  id: number;
  idArquivo: number;
  descricao: string;

  arquivo?: Arquivo;
  base64?: string;

  presenteCategoria?: PresenteCategoria[];
  listIdCategoria?: number[];

}



export interface PresenteCadastro {
  file?: any;
  id?: number;
  descricao: string;

  listIdCategoria: number[];
}

export interface PresenteCategoria {
  id: number;
  idPresente: number;
  idCategoria: number;
  categoria?: Categoria;

}



