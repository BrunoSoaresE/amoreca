import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvironmentService } from '../../environment.service';
import { BaseService } from '../../shared/services/base.service';
import { Presente, PresenteCadastro } from '../../models/presente';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PresenteService extends BaseService {
  protected http: HttpClient;

  constructor(protected injector: Injector, protected router: Router,) {
    super(injector, EnvironmentService.settings.api.url, 'presente');
    this.http = injector.get(HttpClient);
  }

  getPresenteById(id: number): Observable<Presente> {
    let retorno = this.get(`${id}`)
    return retorno;
  }
  getListPresente(): Observable<Presente[]> {
    let retorno = this.get(``)
    return retorno;
  }

  salvarPresente(presente: PresenteCadastro): Observable<Presente> {
    const formData = new FormData();

    if (presente.id)
      formData.append('id', `${presente.id}`);
    if (presente.descricao)
      formData.append('descricao', `${presente.descricao}`);


    if (presente.listIdCategoria && Array.isArray(presente.listIdCategoria)) {
      presente.listIdCategoria.forEach(id => {
        formData.append('ListIdCategoria', id.toString());
      });
    }

    if (presente.file instanceof File) {
      formData.append('file', presente.file, presente.file.name);
    }


    let retorno = this.post(`salvar-presente`, formData);
    return retorno;
  }
}


