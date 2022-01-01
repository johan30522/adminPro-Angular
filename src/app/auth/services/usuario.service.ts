import { Usuario } from './../../models/usuario.model';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { RegisterForm, AuthResponse } from '../../Interfaces/register.interface.ts';
import { environment } from '../../../environments/environment';
import { catchError, map, tap, delay } from 'rxjs/operators';
import { LoginForm } from 'src/app/Interfaces/login.interface';
import { Router } from '@angular/router';
import { CargaUsuario } from 'src/app/Interfaces/cargar-usuarios.interface';



declare const gapi: any;



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public _usuario!: Usuario;
  public auth2: any;

  get usuario() {
    return this._usuario;
  }



  get headers(): HttpHeaders {
    return new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')
  }

  private _urlApi: string = environment.baseUrlApi;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {

    this.initGoogle();

  }


  public initGoogle() {
    console.log('google Init');
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '360946755732-c3ajjcrmn4brverkmdtilef5l2p0u74o.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',

        });
        resolve();
      });
    })

  }

  public createUser(data: RegisterForm) {

    const url = `${this._urlApi}usuario`

    return this.httpClient.post<AuthResponse>(url, data)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            console.log(resp);
            localStorage.setItem('token', resp.token!)
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msj))
      )
  }

  public updateUser(data: Usuario) {

    const url = `${this._urlApi}usuario/${this._usuario.uid}`
    const headers = this.headers;
    data.role = this._usuario.role;

    return this.httpClient.put<AuthResponse>(url, data, { headers })
      .pipe(
        map(resp => {

          this._usuario.name = resp.usuario!.name;
          this._usuario.email = resp.usuario!.email;

          return resp.ok;
        }),
        catchError(err => of(err.error.msj))
      )
  }

  public saveUser(data: Usuario) {

    const url = `${this._urlApi}usuario/${data.uid}`
    const headers = this.headers;
    data.role = this._usuario.role;

    return this.httpClient.put<AuthResponse>(url, data, { headers })
      .pipe(
        map(resp => {
          return resp.ok;
        }),
        catchError(err => of(err.error.msj))
      )
  }


  public obtieneUsuario(): Observable<Usuario> {
    return of(this._usuario);
  }

  public login(formData: LoginForm) {

    const url = `${this._urlApi}auth/`

    return this.httpClient.post<AuthResponse>(url, formData)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!)
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msj))
      )
  }


  public loginGoogle(token: string) {

    const url = `${this._urlApi}auth/google`

    const body = { token }

    return this.httpClient.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.tokenAuth!)
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msj))
      )
  }


  public validarToken(): Observable<boolean> {
    const url = `${this._urlApi}auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.httpClient.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          localStorage.setItem('token', resp.token!);
          this._usuario = new Usuario(
            resp.usuario!.uid,
            resp.usuario!.name,
            resp.usuario!.email,
            resp.usuario!.img,
            resp.usuario!.google,
            resp.usuario!.role
          );
          //this._usuario = resp.usuario!;
          return resp.ok;
        }),
        catchError(err => of(false))
      )

  }
  public logOut() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/auth/login');
      })

    });
  }

  public cargarListaUsuarios(desde: number = 0) {
    const url = `${this._urlApi}usuario?desde=${desde}`;
    const headers = this.headers;
    return this.httpClient.get<CargaUsuario>(url, { headers })
      .pipe(
        map((resp) => {
          console.log(resp);
          const usuarios=resp.usuarios
            .map(user=>new Usuario(user.uid,user.name,user.email,user.img,user.google,user.role))
          return {total:resp.total,usuarios};
        })
      );
  }

  public deletUsuario(id: string): Observable<any> {
    console.log(id);
    const url = `${this._urlApi}usuario/${id}`;
    const headers = this.headers;
    return this.httpClient
      .delete<any>(url,{headers})
        .pipe(
          map((resp) => resp.ok),
          catchError(err => of(err.error.msj))
        )

  }
  
}
