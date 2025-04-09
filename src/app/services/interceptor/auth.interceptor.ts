import {Injectable, Optional} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(protected authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let authReq = req;

    if (!req.headers.has('Authorization')) {
      return new Observable<HttpEvent<any>>((subscriber) => {

        var token = this.authService.getBearerToken()
        if (token) {
          authReq = this.getAuthReq(req, token);
          console.log(token);
        }

        next.handle(authReq).subscribe(c => subscriber.next(c));


      });
    }

    return next.handle(authReq);
  }

  private getAuthReq(req: HttpRequest<any>, token: string) {
    const { method, url, body, responseType } = req;

    if (body instanceof FormData) {
      return  new HttpRequest(method, url, body, {
        headers: new HttpHeaders({Authorization: `Bearer ${token}`}),
        responseType,
      });
    }
    else {
      return  req.clone({
        headers: this.getHeader(req,token)
      });
    }
  }


  private getHeader(req: HttpRequest<any>, token: string): HttpHeaders {
     let httpHeaders = req.headers.set('Authorization', `Bearer ${token}`);

      if (!req.headers.has('content-type')) {
        httpHeaders = httpHeaders.set('content-type', 'application/json');
    }

    return httpHeaders;
  }
}
