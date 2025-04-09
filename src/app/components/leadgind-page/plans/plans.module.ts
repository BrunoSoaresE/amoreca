import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { PlansComponent } from './plans.component';


@NgModule({
    imports: [
      CommonModule
    ,
    ],
  declarations: [
    PlansComponent
  ],
  exports: [
    PlansComponent
  ]
})
export class PlansModule {
}
