import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../auth/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
    a:hover {
      cursor:pointer;
    }
    `
  ]
})
export class SidebarComponent implements OnInit {

public menu:any;

  constructor(
    private readonly sidebarService:SidebarService,
    private readonly router:Router,
    private readonly usuarioService:UsuarioService
    ) {

    this.menu=sidebarService.menuItems;

   }

  ngOnInit(): void {
  }
  public logout():void{
    this.usuarioService.logOut();
  }

}
