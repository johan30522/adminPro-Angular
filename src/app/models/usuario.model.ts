
export class Usuario {

    constructor(
        public uid: string,
        public name: string,
        public email: string,
        public password:string,
        public img:string,
        public google: boolean,
        public role: string,

    ) { }

}
