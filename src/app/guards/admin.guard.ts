import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../auth/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

constructor(private readonly usuarioService:UsuarioService,
    private readonly router:Router    
  ){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if(this.usuarioService.role==='ADMIN_ROLE'){
        return true;
      } else{
        this.router.navigateByUrl('/app/dashboard');
        return false;
      }

      //'ADMIN_ROLE'|'USER_ROLE'
    
  }

}
