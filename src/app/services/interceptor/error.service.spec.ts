import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastModule, ToastService } from '@cnj/uikit';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpConfigInterceptor } from './http-config.interceptor';
import { MockProvider } from 'ng-mocks';
import { IdpService } from '../../_core/authentication-idp/idp.service';

describe('ErrorService', () => {
  let service: ErrorService;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastModule, HttpClientTestingModule],
      providers: [HttpConfigInterceptor, MockProvider(IdpService)]
    });
    service = TestBed.inject(ErrorService);
    toastService = TestBed.inject(ToastService);
  });

  beforeEach(() => {
    spyOn(toastService, 'warning');
    spyOn(toastService, 'error');
    spyOn(console, 'log');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve chamar toastService warning quando ocorrer o erro (404)', (done) => {
    service.set(new HttpErrorResponse({ status: 404, error: { message: 'Erro 404 Not Found' } })).subscribe(c => {
      expect(c).toEqual(null);
      expect(toastService.warning).toHaveBeenCalled();
      done();
    });
  });

  it('Deve chamar toastService error quando ocorrer o erro (500)', (done) => {
    service.set(new HttpErrorResponse({ status: 500, error: { message: 'Erro 500 Server error' } })).subscribe(c => {
      expect(c).toEqual(null);
      expect(toastService.error).toHaveBeenCalled();
      done();
    });
  });

  it('Deve chamar toastService warning quando ocorrer o erro (401)', (done) => {
    service.set(new HttpErrorResponse({ status: 401, error: { message: 'Erro 401 Unauthorized' } })).subscribe(c => {
      expect(c).toEqual(null);
      expect(toastService.warning).toHaveBeenCalled();
      done();
    });
  });

  it('Deve retornar nulo quando o resultado for (200)', (done) => {
    service.set(new HttpErrorResponse({ status: 200, error: { message: 'Ok 200' } })).subscribe(c => {
      expect(c).toEqual(null);
      done();
    });
  });
});
