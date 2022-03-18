import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

import Swal from "sweetalert2";

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public auth2: any;

  public miForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  })
  constructor(
    private readonly formBuilder: FormBuilder,
    private router: Router,
    private readonly authService: UsuarioService,
    private readonly ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.loadDefaults();
    this.renderButton();
  }

  public loadDefaults(): void {
    let rememberValue = localStorage.getItem('remember') === 'true' ? true : false;
    this.miForm.reset({
      email: localStorage.getItem('email'),
      remember: rememberValue
    })
  }

  public login(): void {

    const formData = this.miForm.value;

    this.authService.login(formData).subscribe(
      (resp) => {
        if (resp === true) {
          console.log('autenticado');
          if (formData.remember) {
            localStorage.setItem('email', this.miForm.get('email')!.value);
            localStorage.setItem('remember', this.miForm.get('remember')!.value);
          } else {
            localStorage.setItem('email', '');
            localStorage.setItem('remember', '');
          }

          this.router.navigateByUrl('/app/dashboard')
        } else {

          Swal.fire('Error', resp, 'error');
        }

      }
    )


  }

  public renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }
  public async startApp() {

    await this.authService.initGoogle();
    this.auth2=this.authService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));

  }
  public attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;

        this.authService.loginGoogle(id_token).subscribe((resp) => {

          if (resp === true) {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/app/dashboard')
            })

          } else {

            Swal.fire('Error', resp, 'error');
          }

        });

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
