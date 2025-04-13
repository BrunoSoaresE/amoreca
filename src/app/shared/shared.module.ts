import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { AutoCompleteModule } from './components/auto-complete/auto-complete.module';

@NgModule({
  imports: [
    ToastrModule.forRoot(),
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
    , AutoCompleteModule

  ],
  declarations: [
  ],
  exports: [
    ToastrModule,
    MatNativeDateModule
    , FormsModule
    , ReactiveFormsModule
    , AutoCompleteModule

  ]
})
export class SharedModule {
}
