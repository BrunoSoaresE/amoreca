import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { BaseService } from '../shared/services/base.service';
import { Login, Pessoa, PessoaLogin } from '../models/pessoa';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../environment.service';
import { Router } from '@angular/router';
import { isBrowser } from '../shared/functions/util';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id: string;
  Nome: string;
  Documento: string;
  Email: string;
  AdmSistema: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  protected http: HttpClient;
  protected bearerTokenSubject$ = new BehaviorSubject<string | undefined>(undefined);
  bearerToken$ = this.bearerTokenSubject$.asObservable();


  constructor(protected injector: Injector, protected router: Router,) {
    super(injector, EnvironmentService.settings.api.url, 'auth');
    this.http = injector.get(HttpClient);

    if (isBrowser() && sessionStorage.getItem('bearerToken'))
      this.setBearerToken(sessionStorage.getItem('bearerToken') ?? undefined);

  }

  setBearerToken(bearToken: string | undefined) {
    this.bearerTokenSubject$.next(bearToken);

    if (bearToken === undefined) {
      this.router.navigate(['/']).then();
      if (isBrowser())
        sessionStorage.removeItem('bearerToken');
    } else {
      if (isBrowser())
        sessionStorage.setItem('bearerToken', bearToken);
    }
  }

  getBearerToken() {
    return this.bearerTokenSubject$.value || (isBrowser() && sessionStorage?.getItem('bearerToken'));
  }

  _getDecodedToken(): JwtPayload | null {
    const token = this.getBearerToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  }

  isAdmin(): boolean {
    const decoded = this._getDecodedToken();
    return decoded?.AdmSistema?.toLowerCase() === 'true';
  }



  login(login: Login): Observable<PessoaLogin> {
    let retorno = this.post(``, login);
    return retorno;
  }

  getUserLogado(): Observable<Pessoa> {
    let retorno = this.get(`info`)
    return retorno;
  }

}


