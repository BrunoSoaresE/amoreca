import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  standalone: false,
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {



}
