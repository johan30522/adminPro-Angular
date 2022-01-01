import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DoghnutComponent } from './doghnut/doghnut.component';

import { ChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DoghnutComponent,
    ModalImageComponent
  ],
  exports:[
    IncrementadorComponent,
    DoghnutComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
