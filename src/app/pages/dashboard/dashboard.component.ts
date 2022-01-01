import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/auth/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  public actualUser=this.authService._usuario;


  constructor(private readonly authService:UsuarioService) { }

  ngOnInit(): void {
console.log(this.actualUser);

  }

}
