import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvironmentService } from '../../environment.service';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';
import { Evento, EventoCadastro } from '../../models/evento';


@Injectable({ providedIn: 'root' })
export class EventoService extends BaseService {
  protected http: HttpClient;

  constructor(protected injector: Injector, protected router: Router,) {
    super(injector, EnvironmentService.settings.api.url, 'evento');
    this.http = injector.get(HttpClient);
  }

  getEventoById(id: number): Observable<Evento> {
    let retorno = this.get(`${id}`)
    return retorno;
  }
  getListEvento(): Observable<Evento[]> {
    let retorno = this.get(``)
    return retorno;
  }

  salvarEvento(evento: EventoCadastro): Observable<Evento> {
    console.log("🚀 ~ EventoService ~ salvarEvento ~ evento:", evento)


    let retorno = this.post(`salvar-evento`, evento);
    return retorno;
  }
}


