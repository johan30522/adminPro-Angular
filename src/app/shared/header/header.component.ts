import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../auth/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
    a:hover {
      cursor:pointer;
    }
    `
  ]
})
export class HeaderComponent implements OnInit {

  constructor( 
    private router:Router,
    private readonly usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  public logout():void{
    this.usuarioService.logOut();
  }


}
