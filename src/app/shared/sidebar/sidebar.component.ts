import { Usuario } from './../../models/usuario.model';
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
  public usuario?: Usuario;

  //public menu: any;

  constructor(
    public readonly sidebarService: SidebarService,
    private readonly router: Router,
    private readonly usuarioService: UsuarioService
  ) {

    //this.menu = sidebarService.menuItems;
    sidebarService.cargarMenu();
  
  }

  ngOnInit(): void {
    this.usuario = this.usuarioService._usuario!;
  }
  public logout(): void {
    this.usuarioService.logOut();
  }

}
