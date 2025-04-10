import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EditBaseComponent } from '../../shared/components/edit-base.component';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  isSidenavOpen = false;
  constructor(
    protected authService: AuthService,
  ) {
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;

  }

  logout() {
    this.authService.setBearerToken(undefined);
  }




}
