import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenUrlPipe } from './imagen-url.pipe';



@NgModule({
  declarations: [ImagenUrlPipe],
  exports:[
    ImagenUrlPipe
  ]
})
export class PipesModule { }
