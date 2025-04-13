import { LoaderService } from './shared/services/loader.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './services/sidenav.service';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { ConsultaAuxiliaresService } from './services/consulta-auxiliares.service';
import { Categoria } from './models/categoria';
import { TemaService } from './services/tema/tema.service';
import { Tema } from './models/tema';
import { AuthService } from './services/auth.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('bottomSidenav') sidenav!: MatSidenav;
  currentComponent: string | null = null;
  mensagemLoader$: any;
  subscription: Subscription = new Subscription();




  constructor(
    private sidenavService: SidenavService,
    protected loaderService: LoaderService
    , protected consultaAuxiliaresService: ConsultaAuxiliaresService
    , protected authService: AuthService
    , private cdRef: ChangeDetectorRef
  ) { }



  ngOnInit(): void {
    this.mensagemLoader$ = this.loaderService.mensagemLoader$;
    this.cdRef.detectChanges();
    this.sidenavService.currentComponent$.subscribe((componentName) => {
      this.currentComponent = componentName;
      this.cdRef.detectChanges();
    });



    this.authService.bearerToken$.subscribe((tokem) => {
      if (tokem) {
        this.consultaAuxiliaresService.loadRegistroAuxiliares()
      }
    });

  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);



  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
