import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { FeedbackComponent } from './feedback.component';


@NgModule({
    imports: [
      CommonModule
    ,
    ],
  declarations: [
    FeedbackComponent
  ],
  exports: [
    FeedbackComponent
  ]
})
export class FeedbackModule {
}
