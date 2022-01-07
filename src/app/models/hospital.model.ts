
import { Usuario } from './usuario.model';

interface _hospitalUser{
    _id:string;
    name:string;
    email?:string;
    img?:string
}


export class Hospital {

    constructor(
        public name: string,
        public id?: string,
        public img?: string,
        public usuario?: _hospitalUser
      
    ) { }



}
