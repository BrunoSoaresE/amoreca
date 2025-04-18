import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { AutoCompleteModule } from './components/auto-complete/auto-complete.module';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    ToastrModule.forRoot(),
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
    , AutoCompleteModule
    , MatButtonModule
    , MatIconModule

  ],
  declarations: [
  ],
  exports: [
    ToastrModule,
    MatNativeDateModule
    , FormsModule
    , ReactiveFormsModule
    , AutoCompleteModule
    , MatButtonModule
    , MatIconModule


  ]
})
export class SharedModule {
}
