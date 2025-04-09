import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';

import {from, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import { ErrorService } from './error.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(protected errorService: ErrorService,
              protected toastrService: ToastrService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {


    return next.handle(request).pipe(
      catchError((errorResponse: any) => {
        console.log('errorResponse')
        console.log(errorResponse)



        if (errorResponse.error instanceof Blob) {
          return from(this.parseErrorBlob(errorResponse));
        }
        return this.errorService.set(errorResponse);
      })
    );
  }

  parseErrorBlob(errorResponse: HttpErrorResponse) {
    return new Promise<any>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: Event) => {
        try {
          const file = (e.currentTarget as FileReader);
          this.toastrService.warning(file.result as any);
          reject(new HttpErrorResponse({
            error: file.result,
            headers: errorResponse.headers,
            status: errorResponse.status,
            statusText: errorResponse.statusText,
            url: errorResponse.url as any
          }));
        } catch (e) {
          this.toastrService.error('Ocorreu o seguinte erro ao realizar a requisição!');
          reject(errorResponse);
        }
      };
      reader.onerror = (e) => {
        this.toastrService.error('Ocorreu o seguinte erro ao realizar a requisição!');
        reject(errorResponse);
      };
      reader.readAsText(errorResponse.error);
    });
  }
}
