import { Component, ChangeDetectionStrategy, Output } from "@angular/core";
import { Router } from "@angular/router";
import { SidenavService } from "../../../services/sidenav.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: false,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  constructor(private sidenavService: SidenavService) { }


  scrollToElement(event: MouseEvent, elementId: string): void {
    event.preventDefault();

    // Obter o elemento com o id fornecido
    const element = document.getElementById(elementId);
    if (element) {
      // Rola suavemente para o elemento, com um deslocamento de 100px
      window.scrollTo({
        top: element.offsetTop - 50, // Deslocamento de 100px para cima
        behavior: 'smooth'
      });
    }
  }

  login() {
    this.sidenavService.open('login');
  }

  signup() {
    this.sidenavService.open('prova');
  }

}
