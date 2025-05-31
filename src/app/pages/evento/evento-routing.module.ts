import { NgModule } from '@angular/core';
import { EventoComponent } from './evento.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    //component: EventoComponent,
    children: [
      // A rota padrão que carrega o EventoPageComponent
      {
        path: '',
        loadComponent: () => import('../../components/evento/evento-page/evento-page/evento-page.component').then((m) => m.EventoPageComponent)
      },
      {
        path: 'presentes',
        loadComponent: () => import('../../components/evento/evento-page/evento-presente/evento-presente.component').then((m) => m.EventoPresenteComponent)
      },
      {
        path: 'recados',
        loadComponent: () => import('../../components/evento/evento-page/evento-recados/evento-recados.component').then((m) => m.EventoRecadosComponent)
      },
      {
        path: 'presenca',
        loadComponent: () => import('../../components/evento/evento-page/evento-presenca/evento-presenca.component').then((m) => m.EventoPresencaComponent)
      },
      {
        path: 'fotos',
        loadComponent: () => import('../../components/evento/evento-page/evento-album-fotos/evento-album-fotos.component').then((m) => m.EventoAlbumFotosComponent)
      },
      { path: '**', redirectTo: '' } // Rota curinga que redireciona para a rota principal
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventoRoutingModule {
}

