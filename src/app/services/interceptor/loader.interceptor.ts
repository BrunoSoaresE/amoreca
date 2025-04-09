import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import { LoaderService } from '../../shared/services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(protected spinner: NgxSpinnerService,
              protected loaderService: LoaderService) {
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);

    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    if (this.requests.length > 0) {
      this.loaderService.setMensagem(req.url);
      this.spinner.show().then();
    } else {
      this.loaderService.setMensagem('');
      this.spinner.hide().then();
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.setMensagem(req.url);
    this.requests.push(req);
    this.spinner.show().then();

    return new Observable((observer: Observer<any>) => {
      const subscription = next.handle(req).subscribe({
          next: (event) => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          error: (err) => {
            this.removeRequest(req);
            observer.error(err);
          },
          complete: () => {
            this.removeRequest(req);
            observer.complete();
          }
        }
      );

      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
