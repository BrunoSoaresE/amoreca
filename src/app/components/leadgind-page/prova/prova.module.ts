import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { ProvaComponent } from './prova.component';


@NgModule({
    imports: [
      CommonModule
    ,
    ],
  declarations: [
    ProvaComponent
  ],
  exports: [
    ProvaComponent
  ]
})
export class ProvaModule {
}
