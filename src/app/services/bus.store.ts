import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, } from 'rxjs';

export enum TipoBusEvent {
  AbrirModalFoto = 'AbrirModalFoto',
}

export interface BusEvent {
  tipoBusEvent: TipoBusEvent;
  valor: any;
}


@Injectable({ providedIn: 'root' })
export class BusStore {
  protected busSubject$ = new Subject<BusEvent | undefined>();
  bus$ = this.busSubject$.asObservable();



  set(evento: BusEvent | undefined) {
    alert('b')
    this.busSubject$.next(evento);
  }




}


