import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PerfilRouterGuard } from './shared/perfil-router.guard';

const routes: Routes = [

   {
      path: '',
      loadChildren: () => import('../app/pages/leadgind/leadgind.module').then(m => m.LeadgindModule),
      // component: LeadgindComponent,
  },

  {
      path: 'home',
      loadChildren: () => import('../app/pages/home/home.module').then(m => m.HomeModule),
      canActivate: [PerfilRouterGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' , preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
