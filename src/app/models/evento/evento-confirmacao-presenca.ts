
export interface EventoConfirmacaoPresencaCadastro {
  idEvento: number;
  nome: string;
  acompanhantes: string[];
}

export interface EventoConfirmacaoPresenca {
  id: number;
  nome: string;
  criadoEm: Date;
  acompanhantes: EventoConfirmacaoAcompanhante[];
}

export interface EventoConfirmacaoAcompanhante {
  id: number;
  nome: string;
  idConfirmacaoPresenca: number;
}