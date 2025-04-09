import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {ToastModule, ToastService} from '@cnj/uikit';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ErrorService} from './error.service';
import {LoaderInterceptor} from './loader.interceptor';
import {IdpService} from '../../_core/authentication-idp/idp.service';
import {MockProvider} from 'ng-mocks';

describe('LoaderInterceptor', () => {
  let interceptor: LoaderInterceptor;
  let httpMock: HttpTestingController;
  let errorService: ErrorService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastModule],
      providers: [LoaderInterceptor, ToastService, ErrorService, MockProvider(IdpService)]
    });
    errorService = TestBed.inject(ErrorService);
    interceptor = TestBed.inject(LoaderInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    spyOn(errorService, 'set');
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(interceptor).toBeTruthy());
});
