import { Component, ChangeDetectionStrategy, Output } from "@angular/core";
import { Router } from "@angular/router";
import { SidenavService } from "../../../services/sidenav.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent
{

  constructor(private sidenavService: SidenavService) { }




  login() {
      this.sidenavService.open('login');
  }

  signup() {
      this.sidenavService.open('prova');
  }

}
