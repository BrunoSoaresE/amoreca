import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvironmentService } from '../../environment.service';
import { BaseService } from '../../shared/services/base.service';
import { Tema, TemaCadastro } from '../../models/tema';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class TemaService extends BaseService {
  protected http: HttpClient;

  constructor(protected injector: Injector, protected router: Router,) {
    super(injector, EnvironmentService.settings.api.url, 'tema');
    this.http = injector.get(HttpClient);
  }

  getTemaById(id: number): Observable<Tema> {
    let retorno = this.get(`${id}`)
    return retorno;
  }
  getListTema(): Observable<Tema[]> {
    let retorno = this.get(``)
    return retorno;
  }

  salvarTema(tema: TemaCadastro): Observable<Tema> {
    const formData = new FormData();

    if (tema.id)
      formData.append('id', `${tema.id}`);
    if (tema.descricao)
      formData.append('descricao', `${tema.descricao}`);
    if (tema.corPrimaria)
      formData.append('corPrimaria', `${tema.corPrimaria}`);
    if (tema.corSecundaria)
      formData.append('corSecundaria', `${tema.corSecundaria}`);
    if (tema.corTerciaria)
      formData.append('corTerciaria', `${tema.corTerciaria}`);

    if (tema.listIdCategoria && Array.isArray(tema.listIdCategoria)) {
      tema.listIdCategoria.forEach(id => {
        formData.append('ListIdCategoria', id.toString());
      });
    }

    if (tema.file instanceof File) {
      formData.append('file', tema.file, tema.file.name);
    }


    let retorno = this.post(`salvar-tema`, formData);
    return retorno;
  }
}


