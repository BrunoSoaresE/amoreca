import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  standalone: false,
  selector: 'app-component',
  templateUrl: './leadgind.component.html',
  styleUrls: ['./leadgind.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadgindComponent {
  isSidenavOpen = false;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }


}
