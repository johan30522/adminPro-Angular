import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from '../../../../../services/search.service';
import { MedicosService } from '../../../../../services/medicos.service';
import { Medico } from '../../../../../models/medico.model';
import Swal from "sweetalert2";
import { ModalMedicoComponent } from '../modal-medico/modal-medico.component';
import { ModalImageComponent } from '../../../../../components/modal-image/modal-image.component';
import { HospitalesService } from '../../../../../services/hospitales.service';
import { Hospital } from '../../../../../models/hospital.model';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  public listaMedicos: Medico[] = [];
  public listaMedicosTemp: Medico[] = [];
  public listaHospital: Hospital[] = [];
  public totalMedicos: number = 0;
  public desde: number = 0;
  public loading: boolean = true;

  constructor(
    private readonly medicosService:MedicosService,
    private readonly hospitalService:HospitalesService,
    private readonly modalService:NgbModal,
    private readonly searchService:SearchService


  ) { }

  ngOnInit(): void {
    this.loadMedicos();
    this.loadHospitales();
  }

  public loadMedicos(){
    this.medicosService.getMedicos(this.desde)
    .subscribe(({total,medicos})=>{
      console.log(medicos);
      this.totalMedicos = total;
        if (medicos.length !== 0) {
          this.listaMedicos = medicos;
          this.listaMedicosTemp = medicos;
        }
        this.loading = false;
    })
  }

  public loadHospitales(){
    this.hospitalService.getHospitals(this.desde)
    .subscribe(({hospitales})=>{
      //console.log(hospitales);
        if (hospitales .length !== 0) {
          this.listaHospital = hospitales;
        }
        this.loading = false;
    })
  }

  public cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalMedicos) {
      this.desde = this.totalMedicos - 5;
    }
    this.loadMedicos()
  }

  public salvar(medico:Medico){
    this.medicosService.updateMedicos(medico).subscribe(
      (resp) => {
        console.log(resp);
  
        if (resp === true) {
          console.log('Actualizado');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Medico Actualizado Correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          console.log('error', resp);
          Swal.fire('Error', resp, 'error');
        }
  
      })
  }
  public eliminar(medico:Medico){
  
      Swal.fire({
        title: `Esta seguro de eliminar el medico ${medico.name} ?`,
        text: "La accion no se podra revertir!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.medicosService.delMedicos(medico.id!).subscribe((resp) => {
            if (resp === true) {
              this.loadMedicos();
              Swal.fire(
                'Eliminación Exitosa!',
                'Se ha eliminado el Medico.',
                'success'
              )
            } else {
              console.log('error', resp);
              Swal.fire('Error', resp, 'error');
            }
          });
        }
      })
  }
  
  public showModal(medico:Medico): void {
    const modalRef = this.modalService.open(ModalImageComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.objeto = medico;
  }
  public createMedico(){
    const modalRef = this.modalService.open(ModalMedicoComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.successfulTransaction.subscribe(() => {
      this.loadMedicos()
    });
  }
  
  
  public buscar(termino: string): void {
    console.log(termino);
  
    if (termino.length === 0) {
  
      this.listaMedicos = this.listaMedicosTemp
      return
    }
  
    this.loading = true;
    this.searchService.buscar('medicos', termino)
      .subscribe((resp) => {
        console.log(resp);
        this.listaMedicos = resp as Medico[];
        this.loading = false;
      })
  }

}
