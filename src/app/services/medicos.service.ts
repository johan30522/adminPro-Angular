import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CargaMedicos } from '../Interfaces/cargar-medicos.interface';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MedResponse } from '../Interfaces/register.interface.ts';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private _urlApi: string = environment.baseUrlApi;

  constructor(
    private readonly httpClient: HttpClient

  ) { }
  get headers(): HttpHeaders {
    return new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')
  }


  public getMedicos(desde: number = 0) {
    const url = `${this._urlApi}medicos?desde=${desde}`;
    const headers = this.headers;
    return this.httpClient.get<CargaMedicos>(url, { headers })
      .pipe(
        map((resp) => {
          const medicos = resp.medicos
            .map(med => new Medico(med.name, med.id, med.img, med.usuario,med.hospital))
          return { total: resp.total, medicos: medicos };
        })
      );
    /* .pipe(
       map((resp:{total:number,meditals:medital[]})=>resp.meditals)
     );*/
  }


  public delMedicos(id: string): Observable<any> {

    const url = `${this._urlApi}medicos/${id}`;
    const headers = this.headers;
    return this.httpClient
      .delete<any>(url, { headers })
      .pipe(
        map((resp) => resp.ok),
        catchError(err => of(err.error.msj))
      )

  }
  public updateMedicos(data: Medico,id:string) {

    const url = `${this._urlApi}medicos/${id}`
    const headers = this.headers;
console.log(`el id es ${id}`);

    return this.httpClient.put<MedResponse>(url, data, { headers })
      .pipe(
        map(resp => {
          return resp.ok;
        }),
        catchError(err => of(err.error.msj))
      )
  }


  public createMedicos(data: Medico) {


    const url = `${this._urlApi}medicos`
    const headers = this.headers;
    
    return this.httpClient.post<MedResponse>(url, data, { headers })
      .pipe(
        map(resp => {
          
          return resp.ok;
        }),
        catchError(err => of(err.error.msj))
      )
  }






}
