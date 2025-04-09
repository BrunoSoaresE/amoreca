import { Injectable, ViewContainerRef, Injector, EnvironmentInjector, ɵComponentType, NgModuleRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private sidenav: MatSidenav | null = null;
  private currentComponentSubject = new BehaviorSubject<string | null>(null);
  currentComponent$ = this.currentComponentSubject.asObservable();


  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }



  open(nomeComponent: string) {
    this.currentComponentSubject.next(nomeComponent);

    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }


  close() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}
