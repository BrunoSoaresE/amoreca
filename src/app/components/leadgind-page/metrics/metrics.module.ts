import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { MetricsComponent } from './metrics.component';


@NgModule({
    imports: [
      CommonModule
    ,
    ],
  declarations: [
    MetricsComponent
  ],
  exports: [
    MetricsComponent
  ]
})
export class MetricsModule {
}
