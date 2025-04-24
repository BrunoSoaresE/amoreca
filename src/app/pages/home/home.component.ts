import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  standalone: false,
  selector: 'app-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('sidenavWidth', [
      state('small', style({
        width: '75px',
      })),
      state('large', style({
        width: '250px',
      })),
      transition('small <=> large', [
        animate('0.2s ease-in-out')
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.4s 0.2s ease-out', style({ opacity: 1 }))
      ]),
    ]),
  ]
})
export class HomeComponent implements OnInit {
  isSmallScreen: boolean = window.innerWidth <= 768;
  isAdmin: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  constructor(
    protected authService: AuthService,
  ) {
  }
  ngOnInit(): void {

    this.authService.bearerToken$.subscribe((tokem) => {
      if (tokem) {
        this.isAdmin = this.authService.isAdmin();
      }
    });

  }

  toggleMenu() {
    this.isSmallScreen = !this.isSmallScreen;

  }


  logout() {
    this.authService.setBearerToken(undefined);
  }




}
