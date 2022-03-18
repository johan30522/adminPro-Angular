import { UsuariosComponent } from './mantenimientos/pages/mantenimientos/usuarios/usuarios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { ObserversComponent } from './observers/observers.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { MedicosComponent } from './mantenimientos/pages/mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/pages/mantenimientos/hospitales/hospitales.component';
import { SearchComponent } from './search/search.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AdminGuard } from '../guards/admin.guard';


const routes: Routes = [
  {
    path: '',
    component:PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent,data:{tittle:'Dashboard'} },
      { path: 'grafica', component: Grafica1Component ,data:{tittle:'Grafics'} },
      { path: 'profile', component: ProfileComponent ,data:{tittle:'Profile'} },
      { path: 'progress', component: ProgressComponent ,data:{tittle:'ProgressBar'} },
      { path: 'account-settings', component: AccountSettingsComponent,data:{title:'Account Settings'}  },
      { path: 'promises', component: PromisesComponent,data:{tittle:'Promises'}  },
      { path: 'observers', component: ObserversComponent,data:{tittle:'Observers'} },
      { path: 'rxjs', component: RxjsComponent ,data:{tittle:'Operators RXJS'}},

      { path: 'chatbot', component: ChatbotComponent ,data:{tittle:'Chat bot'}},


      //Rtas de Admin**********************
      { path: 'usuarios', component: UsuariosComponent,data:{tittle:'Usuarios'}
        ,canActivate:[AdminGuard],canLoad:[AdminGuard]},
      { path: 'medicos', component: MedicosComponent,data:{tittle:'Medicos'},
        canActivate:[AdminGuard],canLoad:[AdminGuard]},
      { path: 'hospitales', component: HospitalesComponent ,data:{tittle:'Hospitales'},
        canActivate:[AdminGuard],canLoad:[AdminGuard]},
      //************************************************************************* */




      { path: 'search/:termino', component: SearchComponent ,data:{tittle:'Busqueda'}},



      { path: '**', redirectTo: 'dashboard' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
