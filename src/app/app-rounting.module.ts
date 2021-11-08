import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { ProgressComponent } from './pages/progress/progress.component';

const routes: Routes = [

    {
        path: '', component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'grafica', component: Grafica1Component },
            {path: '', redirectTo:'/dashboard', pathMatch: 'full'}

        ]
    },


    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    //,
    { path: '**', component: NopagefoundComponent }

    /*{
      path: 'app',
      loadChildren: () =>
        import('./protected/protected.module').then(
          (module) => module.ProtectedModule
        ),
        canActivate:[ValidarTokenGuard],
        canLoad:[ValidarTokenGuard]
    },
    {
      path:'**',
      redirectTo:'auth'
    }*/

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: false// habilita la compatibilidad de rutas en navegadores antiguos y con conflictos en rutas existentes de backend
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
