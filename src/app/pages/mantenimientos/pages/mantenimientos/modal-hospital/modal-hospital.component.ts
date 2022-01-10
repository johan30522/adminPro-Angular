import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalesService } from '../../../../../services/hospitales.service';

import Swal from "sweetalert2";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-hospital',
  templateUrl: './modal-hospital.component.html',
  styleUrls: ['./modal-hospital.component.css']
})
export class ModalHospitalComponent implements OnInit {


  @Output()
  public readonly successfulTransaction = new EventEmitter<boolean>();

  constructor(
    private modalService: NgbModal,
    private readonly formBuilder: FormBuilder,
    private readonly hospitalesService:HospitalesService

  ) { }

  public miForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]]
  })

  ngOnInit(): void {
  }

  public closeModal() {
    console.log('close!!!!');
    this.modalService.dismissAll();
  }

  public saveForm(){

    let hospital=this.miForm.value;
    this.hospitalesService.createHospital(hospital).subscribe(
      (resp) => {
        console.log(resp);
  
        if (resp === true) {
          console.log('Creado');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Hospital Creado Correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.successfulTransaction.emit(true);
          this.closeModal();
        } else {
          console.log('error', resp);
          Swal.fire('Error', resp, 'error');
        }
  
      })
  }

}
