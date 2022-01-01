import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../auth/services/usuario.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import Swal from "sweetalert2";
import { RegisterForm } from 'src/app/Interfaces/register.interface.ts';
import { Router } from '@angular/router';
import { FileUploadService } from '../../auth/services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public usuario?: Usuario;
  public formSubmitted = false;
  public imagenSubir?:File;
  public imgTemp?:any|null;


  public miForm: FormGroup = this.formBuilder.group({
    name: [this.usuarioService._usuario?.name, [Validators.required]],
    email: [this.usuarioService._usuario?.email, [Validators.required, Validators.email]]
  })

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly uploadImage: FileUploadService
  ) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService._usuario;
    //console.log(this.usuario);
  }
  public saveForm(): void {
    //console.log(this.miForm.value);
    if (this.miForm.invalid) {
      console.log('formulario invalido');
      return;
    }


    this.usuarioService.updateUser(this.miForm.value).subscribe(
      (resp) => {
        //console.log(resp);

        if (resp === true) {
          console.log('Actualizado');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario Actualizado Correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          console.log('error', resp);
          Swal.fire('Error', resp, 'error');
        }

      }
    )

  }
  public uploadImageAction(event: any) {

    let file: File;

    if (event?.target?.files[0]) {
      file = event?.target?.files[0];
      console.log(file);
      this.imagenSubir = file;

      if (!file) {
        console.log('cancela');
        this.imgTemp = null;
      }

      const reader = new FileReader();
      const url64=reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
    }
  }

  public subirImagen(){
    this.uploadImage.updateFile(this.imagenSubir!,'usuarios',this.usuario?.uid!)
    .then((resp)=>{
      this.usuario!.img=resp;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Imagen Actualizada Correctamente',
        showConfirmButton: false,
        timer: 1500
      });
    })
    .catch((err)=>{
      Swal.fire('Error', 'no se pudo actuaizar la imagen', 'error');
    })
  }

}
