import { Usuario } from './../../models/usuario.model';
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

  public usuario?:Usuario;

  constructor( 
    private router:Router,
    private readonly usuarioService:UsuarioService) { }

  ngOnInit(): void {

    
   this.usuario=this.usuarioService._usuario;


  }

  public logout():void{
    this.usuarioService.logOut();
  }

  public search(termino:string){
    if(termino.length===0){
      return;
    }
    this.router.navigateByUrl(`/app/search/${termino}`);
  }


}
