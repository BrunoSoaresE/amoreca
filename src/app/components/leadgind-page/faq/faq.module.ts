import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { FaqComponent } from './faq.component';


@NgModule({
    imports: [
      CommonModule
    ,
    ],
  declarations: [
    FaqComponent
  ],
  exports: [
    FaqComponent
  ]
})
export class FaqModule {
}
