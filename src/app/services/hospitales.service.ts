import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { catchError, map, tap, delay } from 'rxjs/operators';
import { CargaHospitales } from '../Interfaces/cargar-hospitales.interface';
import { Observable, of } from 'rxjs';
import { HospResponse } from '../Interfaces/register.interface.ts';


@Injectable({
  providedIn: 'root'
})
export class HospitalesService {


  private _urlApi: string = environment.baseUrlApi;

  constructor(
    private readonly httpClient: HttpClient

  ) { }

  get headers(): HttpHeaders {
    return new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')
  }



  public getHospitals(desde: number = 0) {
    const url = `${this._urlApi}hospitales?desde=${desde}`;
    const headers = this.headers;
    return this.httpClient.get<CargaHospitales>(url, { headers })
      .pipe(
        map((resp) => {
          console.log(resp);
          const hospitales = resp.hospitals
            .map(hosp => new Hospital(hosp.name, hosp.id, hosp.img, hosp.usuario))
          return { total: resp.total, hospitales: hospitales };
        })
      );
    /* .pipe(
       map((resp:{total:number,hospitals:Hospital[]})=>resp.hospitals)
     );*/
  }


  public delHospitales(id: string): Observable<any> {

    const url = `${this._urlApi}hospitales/${id}`;
    const headers = this.headers;
    return this.httpClient
      .delete<any>(url, { headers })
      .pipe(
        map((resp) => resp.ok),
        catchError(err => of(err.error.msj))
      )

  }
  public updateHospital(data: Hospital) {

    const url = `${this._urlApi}hospitales/${data.id}`
    const headers = this.headers;


    return this.httpClient.put<HospResponse>(url, data, { headers })
      .pipe(
        map(resp => {
          return resp.ok;
        }),
        catchError(err => of(err.error.msj))
      )
  }


  public createHospital(data: Hospital) {

    const url = `${this._urlApi}hospitales/${data.id}`
    const headers = this.headers;
    
    return this.httpClient.post<HospResponse>(url, data, { headers })
      .pipe(
        map(resp => {
          return resp.ok;
        }),
        catchError(err => of(err.error.msj))
      )
  }
}
