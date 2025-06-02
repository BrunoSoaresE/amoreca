import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, } from 'rxjs';
import { EventoService } from './evento.service';
import { Evento } from '../../models/evento/evento';


@Injectable({ providedIn: 'root' })
export class EventoStore implements OnDestroy {
  protected eventoSubject$ = new BehaviorSubject<Evento | undefined>(undefined);
  evento$ = this.eventoSubject$.asObservable();

  subscription: Subscription = new Subscription();

  constructor(
    protected eventoService: EventoService) {

  }


  setEvento(evento: Evento | undefined) {
    this.eventoSubject$.next(evento);
  }

  atualizarEventoByUrlEvento(urlEvento: string) {
    this.subscription.add(
      this.eventoService.getModelByLinkSite(urlEvento).subscribe({
        next: (response: Evento) => {
          this.setEvento(response);
        }
      }),
    );
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


