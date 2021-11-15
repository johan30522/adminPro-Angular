import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private menu:any[]=[
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
          tittle:'Grafica',
          url:'/app/progress'
        }
      ]
    }
  ];


public get menuItems() : any {
  return this.menu;
}


  constructor() { }
}