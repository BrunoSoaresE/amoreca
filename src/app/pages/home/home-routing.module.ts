import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { PerfilRouterGuard } from '../../shared/perfil-router.guard';

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
        loadComponent: () => import('../../components/tema/tema-lista/tema-lista.component').then(m => m.TemaListaComponent),
        canActivate: [PerfilRouterGuard],
        data: { roles: ['adm_sistema'] },
      },
      {
        path: 'presente',
        loadComponent: () => import('../../components/presente/presente-lista/presente-lista.component').then(m => m.PresenteListaComponent),
        canActivate: [PerfilRouterGuard],
        data: { roles: ['adm_sistema'] },
      },
      {
        path: 'eventos',
        loadComponent: () => import('../../components/evento/evento-lista/evento-lista.component').then(m => m.EventoListaComponent)
      },
      {
        path: 'evento',
        loadComponent: () => import('../../components/evento/evento-cadastro/evento-dados/evento-dados.component').then(m => m.EventoDadosNewComponent)
      },
      {
        path: 'evento/:idEvento',
        loadComponent: () => import('../../components/evento/evento-cadastro/evento-dados/evento-dados.component').then(m => m.EventoDadosNewComponent)
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

