import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilRouterGuard implements CanActivate {

  constructor(protected router: Router, protected authService: AuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const bearerToken = this.authService.getBearerToken();
    if (bearerToken) return true;


      this.router.navigate(['/']).then();
      return false;


  }
}
