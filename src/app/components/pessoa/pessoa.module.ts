import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PessoaComponent } from './pessoa.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,

    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule

    , SharedModule

  ],
  declarations: [
    PessoaComponent
  ],
  exports: [
    PessoaComponent
  ]
})
export class PessoaModule {
}
