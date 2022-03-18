import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_URL = environment.baseUrlApi;
@Pipe({
  name: 'imagenUrl'
})
export class ImagenUrlPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {


    let imgReturn: string = '';
    //console.log(this.email,this.img);
  
    if (!img) {
      imgReturn = `${base_URL}upload/${tipo}/no-image.png`;
    } else {
      if (img!.includes('https')) {
        imgReturn = img!;
      } else {
        let image = img ? img : 'no-image.png';
        imgReturn = `${base_URL}upload/${tipo}/${image}`;
      }
    }

    return imgReturn;

  }

}
