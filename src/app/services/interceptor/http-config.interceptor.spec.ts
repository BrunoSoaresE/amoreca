import {TestBed} from '@angular/core/testing';

import {HttpConfigInterceptor} from './http-config.interceptor';
import {HttpErrorResponse, HttpRequest} from '@angular/common/http';
import {ToastModule, ToastService} from '@cnj/uikit';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ErrorService} from './error.service';
import {of, throwError} from 'rxjs';
import {MockProvider} from 'ng-mocks';
import {IdpService} from '../../_core/authentication-idp/idp.service';

describe('HttpConfigInterceptor', () => {
  let interceptor: HttpConfigInterceptor;
  let httpMock: HttpTestingController;
  let errorService: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastModule],
      providers: [HttpConfigInterceptor, ToastService, ErrorService, MockProvider(IdpService)]
    });
    errorService = TestBed.inject(ErrorService);
    interceptor = TestBed.inject(HttpConfigInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    spyOn(errorService, 'set');
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(interceptor).toBeTruthy());

  it('Deve chamar errorService quando ocorrer o erro (404) na requisição', () => {
    const mockHandler = {
      handle: () => throwError(() => new HttpErrorResponse({status: 404, error: {message: 'Erro 404 Not Found'}}))
    };
    interceptor.intercept(new HttpRequest<unknown>('GET', '/teste'), mockHandler)
      .subscribe({
        next: (response) => fail('Expected error'),
        error: (error) => {
          expect(error).toBeTruthy();
          expect(errorService.set).toHaveBeenCalled();
        }
      });
  });

  it('Deve chamar errorService quando ocorrer o erro (500) na requisição', () => {
    const mockHandler = {
      handle: () => throwError(() => new HttpErrorResponse({status: 500, error: {message: 'Erro 500 Server error'}}))
    };
    interceptor.intercept(new HttpRequest<unknown>('GET', '/teste'), mockHandler)
      .subscribe({
        next: (response) => fail('Expected error'),
        error: (error) => {
          expect(error).toBeTruthy();
          expect(errorService.set).toHaveBeenCalled();
        }
      });
  });

  it('Deve chamar errorService quando ocorrer o erro (200) na requisição', () => {
    const mockHandler = {
      handle: () => throwError(() => new HttpErrorResponse({status: 200, error: {message: 'Erro 200'}}))
    };
    interceptor.intercept(new HttpRequest<unknown>('GET', '/teste'), mockHandler)
      .subscribe({
        next: (response) => fail('Expected error'),
        error: (error) => {
          expect(error).toBeTruthy();
          expect(errorService.set).toHaveBeenCalled();
        }
      });
  });

  it('Deve passar a resposta para o próximo manipulador em caso de sucesso', () => {
    const mockHandler = {
      handle: () => of({data: 'Resposta bem-sucedida'})
    } as any;

    interceptor.intercept(new HttpRequest<unknown>('GET', '/teste'), mockHandler)
      .subscribe({
        next: (response) => {
          expect(response).toEqual({data: 'Resposta bem-sucedida'});
        },
        error: (error) => fail('Unexpected error')
      });
  });
});
