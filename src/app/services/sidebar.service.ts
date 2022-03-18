import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
 /* private menu:any[]=[
    {
      tittle:'Dashboard',
      icon:'mdi mdi-gauge',
      submenu:[
        {
          tittle:'Main',
          url:'/app/dashboard'
        },
        {
          tittle:'Progress',
          url:'/app/grafica'
        },
        {
          tittle:'Grafics',
          url:'/app/progress'
        },
        {
          tittle:'Promises',
          url:'/app/promises'
        },
        {
          tittle:'Observers',
          url:'/app/observers'
        },
        {
          tittle:'RxJS',
          url:'/app/rxjs'
        }
      ]
    },
    {
      tittle:'Mantenimientos',
      icon:'mdi mdi-folder-lock-open',
      submenu:[
        {
          tittle:'Usuarios',
          url:'/app/usuarios'
        },
        {
          tittle:'Hospitales',
          url:'/app/hospitales'
        },
        {
          tittle:'Medicos',
          url:'/app/medicos'
        }
      ]
    }
  ];*/

  private menu=[];

  

public cargarMenu():void{
  //se carga del menu que se cargo previamente al loeuarse
  this.menu=JSON.parse(localStorage.getItem('menu')!) || [];
}
public get menuItems() : any {
  return this.menu;
}


  constructor() {

    this.cargarMenu()
   }
}
