import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvironmentService } from '../../environment.service';
import { BaseService } from '../../shared/services/base.service';
import { Tema } from '../../models/tema';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class TemaService extends BaseService {
  protected http: HttpClient;

  constructor(protected injector: Injector, protected router: Router,) {
    super(injector, EnvironmentService.settings.api.url, 'tema');
    this.http = injector.get(HttpClient);
  }


  getListTema(): Observable<Tema[]> {
    let retorno = this.get(``)
    return retorno;
  }

  uploadTema(file: File, descricao: string): Observable<Tema> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    let retorno = this.post(`${descricao}`, formData);
    return retorno;
  }
}


