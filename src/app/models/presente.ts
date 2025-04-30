import { Arquivo, ArquivoBase64 } from "./arquivo";
import { Categoria } from "./categoria";
import { EventoPresente } from "./evento-presente";

export interface Presente {
  id: number;
  idArquivo: number;
  descricao: string;

  arquivo?: Arquivo;
  base64?: string;

  presenteCategoria?: PresenteCategoria[];
  listIdCategoria?: number[];

  quantidadeSugerida?: number;
  precoSugerido?: number;


  eventoPresente?: EventoPresente;

}


export interface PresenteCadastro {
  file?: any;
  id?: number;
  descricao: string;
  quantidadeSugerida: number;
  precoSugerido: number;

  listIdCategoria: number[];
}

export interface PresenteCategoria {
  id: number;
  idPresente: number;
  idCategoria: number;
  categoria?: Categoria;

}



