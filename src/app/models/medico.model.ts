import { environment } from '../../environments/environment';
const base_URL = environment.baseUrlApi;


interface _medicoUser{
    _id:string;
    name:string;
    email?:string;
    img?:string
}
interface _medicoHospital{
    _id:string;
    name:string;
    img?:string
}

export class Medico {

    constructor(
        public name: string,
        public id?: string,
        public img?: string,
        public usuario?: _medicoUser,
        public hospital?:_medicoHospital

    ) { }




}
