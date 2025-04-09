import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { FeaturesComponent } from './features.component';


@NgModule({
    imports: [
      CommonModule
    ,
    ],
  declarations: [
    FeaturesComponent
  ],
  exports: [
    FeaturesComponent
  ]
})
export class FeaturesModule {
}
