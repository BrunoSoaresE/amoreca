import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvironmentService } from '../../environment.service';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';
import { Dashboard } from '../../models/dashboard';


@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService {
  protected http: HttpClient;

  constructor(protected injector: Injector, protected router: Router,) {
    super(injector, EnvironmentService.settings.api.url, 'dashboard');
    this.http = injector.get(HttpClient);
  }

  getDashboard(): Observable<Dashboard> {
    let retorno = this.get('')
    return retorno;
  }

}


