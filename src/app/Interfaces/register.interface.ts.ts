export interface RegisterForm {
    name:   string;
    email:  string;
    password:   string;
    password2:    string;
    terminos:boolean
}


export interface AuthResponse{
    ok: boolean,
    msj?: string,
    uid?: string,
    email?:string,
    name?:string,
    token?: string,
    tokenAuth?:string
}

export interface Usuario{
    uid:string;
    name:string;
    email?:string;
}