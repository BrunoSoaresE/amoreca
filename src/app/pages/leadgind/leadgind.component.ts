import {ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-component',
  templateUrl: './leadgind.component.html',
  styleUrls: ['./leadgind.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadgindComponent{
  isSidenavOpen = false;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  
}
