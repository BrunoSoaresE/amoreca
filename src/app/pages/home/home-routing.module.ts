import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
        component: DashboardComponent,
      },

      {
        path: 'tema',
        loadComponent: () => import('../../components/tema/tema-lista/tema-lista.component').then(m => m.TemaListaComponent)
      },
      {
        path: 'evento',
        loadComponent: () => import('../../components/evento/evento-lista/evento-lista.component').then(m => m.EventoListaComponent)
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

