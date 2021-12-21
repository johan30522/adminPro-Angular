import { AuthTokenGuard } from './guards/auth-token.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(
        (module) => module.AuthModule
      )
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./pages/pages.module').then(
        (module) => module.PagesModule
      ),
      canActivate:[AuthTokenGuard],
      canLoad:[AuthTokenGuard]
  },
  {
    path: '**',
    component:NopagefoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false// habilita la compatibilidad de rutas en navegadores antiguos y con conflictos en rutas existentes de backend
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
