import { NgModule } from '@angular/core';
import { EventoComponent } from './evento.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: EventoComponent,
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'pessoa',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: 'dashboard',
    //     loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
    //     component: DashboardComponent,
    //   },
    //   {
    //     path: 'pessoa',
    //     loadChildren: () => import('../../components/pessoa/pessoa.module').then(m => m.PessoaModule),
    //     component: PessoaComponent,
    //   },
    //   {
    //     path: 'tema',
    //     loadComponent: () => import('../../components/tema/tema-lista/tema-lista.component').then(m => m.TemaListaComponent)
    //   },
    //   {
    //     path: 'evento',
    //     loadComponent: () => import('../../components/evento/evento-lista/evento-lista.component').then(m => m.EventoListaComponent)
    //   },
    // ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventoRoutingModule {
}

