import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../auth/services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenGuard implements CanActivate, CanLoad {


  constructor(
    private readonly authService:UsuarioService,
    private readonly router: Router
  ) {

  }




  canActivate(): Observable<boolean> | boolean {

    return this.authService.validarToken()
      .pipe(
        tap(valid => {

          if (!valid) {
            this.router.navigateByUrl('/auth/login')
          }
        })
      )

  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.validarToken()
      .pipe(
        tap(valid => {

          if (!valid) {
            this.router.navigateByUrl('/auth/login')
          }
        })
      )
  }
}
