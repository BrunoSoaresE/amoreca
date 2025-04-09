import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { PessoaComponent } from '../../components/pessoa/pessoa.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'pessoa',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
        component: DashboardComponent,
      },
      {
        path: 'pessoa',
        loadChildren: () => import('../../components/pessoa/pessoa.module').then(m => m.PessoaModule),
        component: PessoaComponent,
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

