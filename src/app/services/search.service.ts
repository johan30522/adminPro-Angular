import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CargaUsuario } from '../Interfaces/cargar-usuarios.interface';
import { Usuario } from '../models/usuario.model';
import { catchError, map, tap, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _urlApi: string = environment.baseUrlApi;


  constructor(
    private readonly httpClient: HttpClient

  ) { }

  get headers(): HttpHeaders {
    return new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')
  }


  public tranformaUsuario(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.uid, user.name, user.email, user.img, user.google, user.role)
    );
  }
  public tranformaHospital(resultados: any[]): Hospital[] {
    return resultados.map(
      hosp => new Hospital(hosp.name, hosp.id, hosp.img, hosp.usuario)
    );
  }

  public buscar(tabla: string, termino: string) {
    const url = `${this._urlApi}todo/coleccion/${tabla}/${termino}`;
    const headers = this.headers;


    return this.httpClient.get<any[]>(url, { headers })
      .pipe(
        map((resp: any) => {
          switch (tabla) {
            case 'usuarios':
              return this.tranformaUsuario(resp.results)
            case 'hospitales':
              return this.tranformaHospital(resp.results)
            default:
              return [];
          }
        })
      )
  }
}
