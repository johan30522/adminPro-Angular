import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { ObserversComponent } from './observers/observers.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './mantenimientos/pages/mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/pages/mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/pages/mantenimientos/medicos/medicos.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalHospitalComponent } from './mantenimientos/pages/mantenimientos/modal-hospital/modal-hospital.component';
import { ModalMedicoComponent } from './mantenimientos/pages/mantenimientos/modal-medico/modal-medico.component';
import { SearchComponent } from './search/search.component';
import { ChatbotComponent } from './chatbot/chatbot.component';


@NgModule({
  declarations: [
    Grafica1Component,
    ProgressComponent,
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PromisesComponent,
    ObserversComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    ModalHospitalComponent,
    ModalMedicoComponent,
    SearchComponent,
    ChatbotComponent,
  ],
  exports:[
    Grafica1Component,
    ProgressComponent,
    PagesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule


  ]
})
export class PagesModule { }
