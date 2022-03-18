import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MedicosService } from '../../../../../services/medicos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Medico } from 'src/app/models/medico.model';
import Swal from "sweetalert2";
import { HospitalesService } from '../../../../../services/hospitales.service';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalImageComponent } from '../../../../../components/modal-image/modal-image.component';


@Component({
  selector: 'app-modal-medico',
  templateUrl: './modal-medico.component.html',
  styleUrls: ['./modal-medico.component.css']
})
export class ModalMedicoComponent implements OnInit {

  public listaHospital: Hospital[] = [];
  public esEditMedico: boolean = false;

  @Input() public medico!: Medico;
  @Output()


  public readonly successfulTransaction = new EventEmitter<boolean>();

  constructor(
    private readonly medicoService: MedicosService,
    private readonly modalService: NgbModal,
    private formBuilder: FormBuilder,
    private readonly hospitalesService: HospitalesService

  ) { }

  public miForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    hospital: ['', [Validators.required]],
  })

  ngOnInit(): void {

    this.loadHospitales();
    console.log(this.medico)
    if (this.medico) {
      this.esEditMedico = true;
      this.initForm();
    }

  }
  public initForm() {
    console.log(this.medico);
    if (this.esEditMedico) {
      this.miForm.reset({
        name: this.medico.name,
        hospital: this.medico.hospital?._id
      })
    }
  }


  public loadHospitales() {
    this.hospitalesService.getHospitalsTodo()
      .subscribe(({ hospitales }) => {
        //console.log(hospitales);
        if (hospitales.length !== 0) {
          this.listaHospital = hospitales;
        }
      })
  }


  public closeModal() {
    this.modalService.dismissAll();
  }

  public showModal(medico:Medico): void {
    const modalRef = this.modalService.open(ModalImageComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.objeto = this.medico;
  }

  public saveForm() {


    if (!this.miForm.valid) {
      Swal.fire('Error', 'Datos Incompletos', 'error');
      return;
    }
    let medico = this.miForm.value;

    if (this.esEditMedico) {
      console.log(medico);
      this.medicoService.updateMedicos(medico,this.medico.id!).subscribe(
        (resp) => {

          if (resp === true) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Medico Creado Correctamente',
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
    } else {

      this.medicoService.createMedicos(medico).subscribe(
        (resp) => {

          if (resp === true) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Medico Actualizado Correctamente',
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
 




}
