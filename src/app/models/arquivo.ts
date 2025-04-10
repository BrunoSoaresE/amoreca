export interface Arquivo {
  id: number;
  nomeOriginal: string;
  nomeArmazenado: string;
  caminhoFisico: string;
  contentType: string;
  tamanhoEmBytes: number;
  dataUpload: Date;
}