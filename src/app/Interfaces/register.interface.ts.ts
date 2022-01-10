import { Hospital } from "../models/hospital.model";
import { Medico } from '../models/medico.model';

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
    tokenAuth?:string,
    usuario?:Usuario
}

export interface Usuario{
    uid:string;
    name:string;
    email?:string;
    img?:string;
    role?:string;
    google?:boolean;
}

export interface HospResponse{
    ok: boolean,
    msj?: string,
    hospital:Hospital
}

export interface MedResponse{
    ok: boolean,
    msj?: string,
    medico:Medico
}