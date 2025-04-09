import {Injector} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {BehaviorSubject, Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';

import {prepare} from '../functions/util';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;text/plain;charset=utf-8;',
    Accept: 'text/plain, text/html,application/xhtml+xml,application/xml;' +
      'q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
  }),
};

export abstract class HttpBaseService {
  protected httpClient: HttpClient;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  protected constructor(injector: Injector) {
    this.httpClient = injector.get(HttpClient);
  }

  baseGet(url: string, params?: HttpParams): Observable<any> {
    return this.httpClient.get<any>(url, {params}).pipe(
      prepare(() => this.isLoadingSubject.next(true)),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  basePost(url: string, body: any) {

    return this.httpClient.post<any>(url, body, httpOptions).pipe(
      prepare(() => this.isLoadingSubject.next(true)),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }


  basePut(url: string, body: any) {

    return this.httpClient.put<any>(url, body, httpOptions).pipe(
      prepare(() => this.isLoadingSubject.next(true)),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }


  basePatch(url: string, body: any) {
    return this.httpClient.patch(url, body, httpOptions).pipe(
      prepare(() => this.isLoadingSubject.next(true)),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  baseDelete(url: string) {
    return this.httpClient.delete<any>(url, httpOptions).pipe(
      prepare(() => this.isLoadingSubject.next(true)),
      finalize(() => this.isLoadingSubject.next(false)),
    );
  }

  baseDownload(url: string, params: any) {
    return this.httpClient.get(url, { params , responseType: 'blob' });
  }


  baseDownloadBase64(url: string, params?: HttpParams): Observable<any> {
    return this.httpClient.get<any>(url, { params });
  }

}
