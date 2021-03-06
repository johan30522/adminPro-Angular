import { environment } from '../../environments/environment';
const base_URL = environment.baseUrlApi;
export class Usuario {

    constructor(
        public uid: string,
        public name: string,
        public email?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,

    ) { }

    get imagenUrl() {


        let imgReturn: string = '';
        //console.log(this.email,this.img);
        if (!this.img) {
            
            imgReturn = `${base_URL}upload/usuarios/no-image.png`;
        } else {
            if (this.img!.includes('https')) {
                imgReturn = this.img!;
            } else {
                let image = this.img ? this.img : 'no-image.png';
                imgReturn = `${base_URL}upload/usuarios/${image}`;
            }
        }

        return imgReturn;
  
    }


}
