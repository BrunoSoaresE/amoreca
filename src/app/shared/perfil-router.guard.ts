import { booleanAttribute, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PerfilRouterGuard implements CanActivate {

  constructor(protected router: Router
    , protected authService: AuthService
    , protected toastr: ToastrService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {



    const bearerToken = this.authService.getBearerToken();


    if (!bearerToken) {
      this.router.navigate(['/']).then();
      return false;
    }

    var roles = next.data['roles'];
    if (!Array.isArray(roles) || (Array.isArray(roles) && roles?.length === 0)) {
      return true;
    }

    if (roles.includes('adm_sistema') && !this.authService.isAdmin()) {
      this.toastr.warning("Usuário sem permissão!");
      this.router.navigate(['/']).then();
      return false;
    }


    return true;


  }
}
