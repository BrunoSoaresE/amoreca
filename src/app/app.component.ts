import { LoaderService } from './shared/services/loader.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './services/sidenav.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('bottomSidenav') sidenav!: MatSidenav;
  currentComponent: string | null = null;
  mensagemLoader$: any;




  constructor(private sidenavService: SidenavService, protected loaderService: LoaderService) { }



  ngOnInit(): void {
    this.mensagemLoader$ = this.loaderService.mensagemLoader$;


    this.sidenavService.currentComponent$.subscribe((componentName) => {
      this.currentComponent = componentName;
    });
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);

  }
}
