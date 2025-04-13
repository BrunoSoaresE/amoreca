import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvironmentService } from '../environment.service';
import { BaseService } from '../shared/services/base.service';
import { BehaviorSubject, map } from 'rxjs';
import { Categoria } from '../models/categoria';
import { isBrowser } from '../shared/functions/util';



@Injectable({ providedIn: 'root' })
export class ConsultaAuxiliaresService extends BaseService {
  protected http: HttpClient;
  private cacheExpirationTime = 86400000; // 1 dia em milissegundos
  private cacheKey = '_cachedTimestamp_050325';
  constructor(protected injector: Injector, protected router: Router,) {
    super(injector, EnvironmentService.settings.api.url, 'consulta-auxiliares');
    this.http = injector.get(HttpClient);
  }

  loadRegistroAuxiliares() {
    this.obterDadosAuxiliares('list-categoria', this.categoriaSubject$);
  }


  private categoriaSubject$ = new BehaviorSubject<Categoria[]>([]);
  categoria$ = this.categoriaSubject$.asObservable();



  private obterDadosAuxiliares<T>(tipoBusca: string, subject$: BehaviorSubject<any[]>) {

    if (subject$ && (!subject$.value || subject$.value.length !== 0)) {
      return;
    }

    const cachedData = this.getCachedService(tipoBusca);

    if (cachedData) {
      subject$.next(JSON.parse(cachedData));
      return;
    }


    const retorno = this.get(`${tipoBusca}`).pipe(
      map((retorno: T[]) => {
        subject$.next(retorno);
        this.setCachedService(tipoBusca, retorno);
        return retorno;
      })
    ).subscribe();

    return retorno;
  }
  private setCachedService(key: string, retorno: any) {
    if (isBrowser()) {
      localStorage?.setItem(key, JSON.stringify(retorno));
      localStorage.setItem(`${key}${this.cacheKey}`, Date.now().toString());
    }

  }
  private getCachedService(key: string): any {
    if (!isBrowser()) return undefined;

    const storageLocal = localStorage?.getItem(key);
    const cachedTimestamp = localStorage?.getItem(`${key}${this.cacheKey}`);

    if (!cachedTimestamp || Date.now() - parseInt(cachedTimestamp) > this.cacheExpirationTime) {
      return undefined;
    }

    return storageLocal;

  }


}






// @Injectable({ providedIn: 'root' })
// export class ConsultaAuxiliaresService extends BaseService {
//   protected http: HttpClient;
//   private cacheExpirationTime = 86400000; // 1 dia em milissegundos
//   private cacheKey = '_cachedTimestamp_050325';

//   constructor(protected injector: Injector, protected router: Router,) {
//     super(injector, EnvironmentService.settings.api.url, 'arquivo');
//     this.http = injector.get(HttpClient);
//   }


//   loadRegistroAuxiliares() {
//     // this.obterDadosAuxiliares('tipos-nacionalidade', this.categoriaSubject$);
//   }


// private categoriaSubject$ = new BehaviorSubject<Categoria[]>([]);
// categoria$ = this.categoriaSubject$.asObservable();



// private obterDadosAuxiliares<T>(tipoBusca: string, subject$: BehaviorSubject<any[]>) {

//   if (subject$ && (!subject$.value || subject$.value.length !== 0)) {
//     return;
//   }

//   const cachedData = this.getCachedService(tipoBusca);

//   if (cachedData) {
//     subject$.next(JSON.parse(cachedData));
//     return;
//   }


//   const retorno = this.get(`${tipoBusca}`).pipe(
//     map((retorno: T[]) => {
//       subject$.next(retorno);
//       this.setCachedService(tipoBusca, retorno);
//       return retorno;
//     })
//   ).subscribe();
//   return retorno;
// }
// private setCachedService(key: string, retorno: any) {
//   localStorage?.setItem(key, JSON.stringify(retorno));
//   localStorage.setItem(`${key}${this.cacheKey}`, Date.now().toString());
// }
// private getCachedService(key: string): any {
//   const storageLocal = localStorage?.getItem(key);
//   const cachedTimestamp = localStorage?.getItem(`${key}${this.cacheKey}`);

//   if (!cachedTimestamp || Date.now() - parseInt(cachedTimestamp) > this.cacheExpirationTime) {
//     return undefined;
//   }

//   return storageLocal;
// }


// }
