import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    ToastrModule.forRoot(),
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule


  ],
  declarations: [
  ],
  exports: [
    ToastrModule,
    MatNativeDateModule
    ,FormsModule
    , ReactiveFormsModule

  ]
})
export class SharedModule {
}
