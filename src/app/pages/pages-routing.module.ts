
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { PagesComponent } from './pages.component';
import { ChildRoutesModule } from './child-routes.module';
import { AuthTokenGuard } from '../guards/auth-token.guard';




const routes: Routes = [
  {
    path: '',
    component:PagesComponent,
    canActivate:[AuthTokenGuard],
    canLoad:[AuthTokenGuard],
    loadChildren:()=>import('./child-routes.module').then(m=>m.ChildRoutesModule)
   
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
