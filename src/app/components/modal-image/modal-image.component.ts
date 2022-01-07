import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { FileUploadService } from 'src/app/auth/services/file-upload.service';

import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {

  @Input() public objeto: any;
  @Output()
  public readonly successfulTransaction = new EventEmitter<boolean>();

  public imagenSubir?:File;
  public imgTemp?:any|null;
  public tipoImagen!:'usuarios'|'medicos'|'hospitales';

  constructor(
    private modalService: NgbModal,
    private readonly uploadImage: FileUploadService

  ) { }

  ngOnInit(): void {

    console.log('obtiene el objeto');
    console.log(this.objeto);

    this.getTipo();
    console.log('tipos ngoninit',this.tipoImagen);
    
  }

  public closeModal(): void {
    this.modalService.dismissAll();
  }

  public getTipo() {
    if (this.objeto instanceof Usuario) {
      this.tipoImagen= 'usuarios';
    } else if(this.objeto instanceof Medico) {
      this.tipoImagen= 'medicos';
    } else if(this.objeto instanceof Hospital) {
      this.tipoImagen= 'hospitales';
    }
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
    this.getTipo();
    this.uploadImage.updateFile(this.imagenSubir!,this.tipoImagen,this.objeto?.uid!)
    .then((resp)=>{
      this.objeto!.img=resp;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Imagen Actualizada Correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      this.successfulTransaction.emit(true);
      this.closeModal();
    })
    .catch((err)=>{
      Swal.fire('Error', 'no se pudo actualizar la imagen', 'error');
    })
  }

}
