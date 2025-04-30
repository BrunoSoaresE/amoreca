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

  getModelByLinkSite(linkEvento: string): Observable<Evento> {
    let retorno = this.get(`link-site/${linkEvento}`)
    return retorno;
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

    const formData = this._appendEventoToFormData(evento);

    let retorno = this.post(`salvar-evento`, formData);
    return retorno;
  }



  _appendEventoToFormData(evento: EventoCadastro): FormData {
    const formData = new FormData();

    // Campos primitivos
    Object.entries(evento).forEach(([key, value]) => {
      if (
        value &&
        key !== 'eventoArquivo' && key !== 'removerArquivos' && key !== 'eventoPresente' // Ignora os filhos para tratar separadamente
      ) {
        // Converte datas para string
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, value as string | Blob);
        }
      }
    });

    // Campos filhos - eventoArquivo
    if (evento.eventoArquivo) {
      evento.eventoArquivo.forEach((arquivo, index) => {
        if (arquivo.file)
          formData.append(`eventoArquivo[${index}].file`, arquivo.file);

        if (arquivo.id)
          formData.append(`eventoArquivo[${index}].id`, `${arquivo.id}`);


        formData.append(`eventoArquivo[${index}].capa`, arquivo.capa ? 'True' : 'False');
      });
    }

    // Campos filhos - eventoPresente
    if (evento.eventoPresente && evento.eventoPresente.length > 0) {
      evento.eventoPresente.forEach((presente, index) => {
        if (presente.id)
          formData.append(`eventoPresente[${index}].id`, `${presente.id}`);

        formData.append(`eventoPresente[${index}].idPresente`, `${presente.idPresente}`);
        formData.append(`eventoPresente[${index}].ativo`, presente.ativo ? 'True' : 'False');
        formData.append(`eventoPresente[${index}].quantidade`, `${presente.quantidade}`);
        formData.append(`eventoPresente[${index}].preco`, `${this.formatDecimalBR(presente.preco)}`);
      });
    }


    // Campos filhos - eventoArquivo
    if (evento.removerArquivos && evento.removerArquivos.length > 0) {
      evento.removerArquivos.forEach((arquivo, index) => {
        formData.append(`removerArquivos[${index}]`, `${arquivo}`);

      });
    }

    return formData;
  }

  formatDecimalBR(value: number | string): string {
    return `${value}`.replace(/,/g, '').replace('.', ',');
  }
}


