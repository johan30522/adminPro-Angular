import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { RegisterForm, AuthResponse, Usuario } from '../../Interfaces/register.interface.ts';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginForm } from 'src/app/Interfaces/login.interface';
import { Router } from '@angular/router';

declare const gapi: any;



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _usuario!: Usuario;
  public auth2: any;

  get usuario() {
    return { ...this._usuario };
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
    console.log('creando Usuario');




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
          localStorage.setItem('token', resp.token!)
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!
          }
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
}
