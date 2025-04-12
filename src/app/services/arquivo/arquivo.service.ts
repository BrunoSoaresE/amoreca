import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvironmentService } from '../../environment.service';
import { BaseService } from '../../shared/services/base.service';
import { Arquivo } from '../../models/arquivo';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ArquivoService extends BaseService {
  protected http: HttpClient;

  constructor(protected injector: Injector, protected router: Router,) {
    super(injector, EnvironmentService.settings.api.url, 'arquivo');
    this.http = injector.get(HttpClient);
  }


  getArquivoByCaminho(nomeArmazenado: string): Observable<Blob> {
    let retorno = this.download(`local/${nomeArmazenado}`)
    return retorno;
  }

  uploadArquivo(file: File, descricao: string): Observable<Arquivo> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    let retorno = this.post(`${descricao}`, formData);
    return retorno;
  }
}


