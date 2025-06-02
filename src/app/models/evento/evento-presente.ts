import { Presente } from "../presente";


export interface EventoPresente {
  id: number;
  idEvento: number;
  idPresente: number;

  ativo: boolean;
  quantidade: number;
  preco: number;

  presente?: Presente;
}


