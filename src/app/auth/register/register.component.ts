import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RegisterForm } from '../../Interfaces/register.interface.ts';

import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;
  public registerForm = this.formBuilder.group({
    nombre: ['johan', [Validators.required, Validators.minLength(3)]],
    email: ['jjoharr@gmail.com', [Validators.required, Validators.minLength(3), Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['123456', [Validators.required]],
    terminos: [true, [Validators.required]],

  }, {
    validators: this.passwordsIguales('password', 'confirmPassword')
  });

  constructor(private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  public signup(): void {
    this.formSubmitted = true;

    console.log(this.registerForm.value);
    console.log(this.registerForm.controls);
    if (this.registerForm.invalid) {
      console.log('formulario invalido');
      return;
    }
    let usuarioI: RegisterForm = {
      name: this.registerForm.get('nombre')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      password2: this.registerForm.get('password')?.value,
      terminos: true
    };

    this.usuarioService.createUser(usuarioI).subscribe(
      (resp) => {
        console.log(resp);
        if (resp === true) {
          console.log('creado');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario Creado Correctamente',
            showConfirmButton: false,
            timer: 1500
          });
            this.router.navigateByUrl('/auth/login');
        } else {
          console.log('error', resp);
          Swal.fire('Error', resp, 'error');
        }

      }
    )

  }

  public isvalid(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted === true) {
      return true;
    } else {
      return false;
    }
  }

  public isAcceptTems(): boolean {
    if (!this.registerForm.get('terminos')?.value && this.formSubmitted === true) {
      return true;
    } else {
      return false;
    }
  }
  public comparepassword = (): boolean => {
    let pass1 = this.registerForm.get('password')?.value;
    let pass2 = this.registerForm.get('confirmPassword')?.value;

    return (pass1 !== pass2) && (this.formSubmitted) ? true : false;

  };

  public passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      let pass1Value = formGroup.get(pass1);
      let pass2Value = formGroup.get(pass2);

      if ((pass1Value?.value !== pass2Value?.value)) {
        console.log('asigna error');
        pass2Value?.setErrors({ noEsIgual: true });
      } else {
        console.log('no asigna error');
        pass2Value?.setErrors(null);
      }
    };
  }

}
