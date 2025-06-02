import { Arquivo } from "../arquivo";


export interface EventoArquivo {
  id: number;
  idEvento: number;
  idArquivo: number;

  capa: boolean;
  ativo: boolean;

  // Relacionamentos
  arquivo?: Arquivo;
  base64?: string;
}

export interface EventoArquivoCadastro {
  id?: number;
  file?: File;
  base64?: string;
  capa: boolean;

  arquivo?: Arquivo;

}



