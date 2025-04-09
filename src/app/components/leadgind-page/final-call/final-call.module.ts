import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { FinalCallComponent } from './final-call.component';


@NgModule({
    imports: [
      CommonModule
    ,
    ],
  declarations: [
    FinalCallComponent
  ],
  exports: [
    FinalCallComponent
  ]
})
export class FinalCallModule {
}
