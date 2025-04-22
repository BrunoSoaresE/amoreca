import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadgindComponent } from './leadgind.component';

const routes: Routes = [
  { path: '', component: LeadgindComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadgindRoutingModule {
}
