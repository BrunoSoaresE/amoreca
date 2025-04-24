import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(protected toastrService: ToastrService,
    protected router: Router) {
  }

  set(errorResponse: HttpErrorResponse) {
    let mensagemAmigavel: string;
    console.log('error');
    console.log(errorResponse);



    switch (errorResponse.status) {
      case 200:
        console.log(errorResponse);
        break;
      case 400:


        if (errorResponse.error && errorResponse.error.title) {
          this.toastrService.error(errorResponse.error.title);



        } else {
          this.toastrService.warning('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
        }


        break;
      case 404:
        this.toastrService.warning(errorResponse.error);
        break;
      case 422:
        if (errorResponse.error && errorResponse.error.split) {
          mensagemAmigavel = errorResponse.error.split('\r\n')[0];
        } else {
          mensagemAmigavel = 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';
        }

        this.toastrService.warning(mensagemAmigavel);

        break;
      case 401:
        this.toastrService.warning('Esta requisição requer autenticação. Por favor realize o login para continuar!');
        this.router.navigate(['/']).then();
        break;
      default:
        this.toastrService.error(
          'Houve um erro ao processar sua requisição.');
    }

    return of(null);
  }
}
