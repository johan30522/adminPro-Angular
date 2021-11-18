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


const routes: Routes = [
  {
    path: '',
    component:PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent,data:{tittle:'Dashboard'} },
      { path: 'grafica', component: Grafica1Component ,data:{tittle:'Grafics'} },
      { path: 'progress', component: ProgressComponent ,data:{tittle:'ProgressBar'} },
      { path: 'account-settings', component: AccountSettingsComponent,data:{title:'Account Settings'}  },
      { path: 'promises', component: PromisesComponent,data:{tittle:'Promises'}  },
      { path: 'observers', component: ObserversComponent,data:{tittle:'Observers'} },
      { path: 'rxjs', component: RxjsComponent ,data:{tittle:'Operators RXJS'}},

      { path: '**', redirectTo: 'dashboard' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
