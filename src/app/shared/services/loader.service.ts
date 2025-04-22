import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private mensagemLoaderSubject = new BehaviorSubject<string | undefined>(undefined);
  mensagemLoader$ = this.mensagemLoaderSubject.asObservable();

  setMensagem(origem: string) {
    this.mensagemLoaderSubject.next(this.getMessagemPorOrigem(origem));
  }
  getMensagem() {
    return this.mensagemLoaderSubject.value;
  }

  private getMessagemPorOrigem(origem: string) {

    if (!origem) {
      return '';
    }


    if (origem.includes('gerar-certidao')) {
      return 'Gerando certidão. Aguarde...';
    }

    if (origem.includes('certidao-assinado')) {
      return 'Assinando digitalmente certidão. Aguarde...';
    }

    if (origem.includes('manutencao-programada/cadastrar')) {
      return 'Amorecando manutenção. Aguarde...';
    }

    return 'Carregando...';
  }
}
