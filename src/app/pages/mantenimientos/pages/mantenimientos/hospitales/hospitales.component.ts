import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalesService } from 'src/app/services/hospitales.service';

import Swal from "sweetalert2";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalImageComponent } from '../../../../../components/modal-image/modal-image.component';
import { ModalHospitalComponent } from '../modal-hospital/modal-hospital.component';
import { SearchService } from '../../../../../services/search.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  public listaHospitales: Hospital[] = [];
  public listaHospitalTemp: Hospital[] = [];
  public totalHospital: number = 0;
  public desde: number = 0;
  public loading: boolean = true;


  constructor(
    private readonly hospiatlService:HospitalesService,
    private readonly modalService:NgbModal,
    private readonly searchService:SearchService

  ) { }

  ngOnInit(): void {
    this.loadHospitals();
  }


//


  public loadHospitals():void{
    this.hospiatlService.getHospitals(this.desde)
    .subscribe(({total,hospitales})=>{
      console.log(hospitales);
      this.totalHospital = total;
        if (hospitales.length !== 0) {
          this.listaHospitales = hospitales;
          this.listaHospitalTemp = hospitales;
        }
        this.loading = false;
    })
  }

  public cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalHospital) {
      this.desde = this.totalHospital - 5;
    }
    this.loadHospitals()
  }


public salvar(hospital:Hospital){
  this.hospiatlService.updateHospital(hospital).subscribe(
    (resp) => {
      console.log(resp);

      if (resp === true) {
        console.log('Actualizado');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Hospital Actualizado Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.log('error', resp);
        Swal.fire('Error', resp, 'error');
      }

    })
  
}
public eliminar(hospital:Hospital){

    Swal.fire({
      title: `Esta seguro de eliminar el hospital ${hospital.name} ?`,
      text: "La accion no se podra revertir!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospiatlService.delHospitales(hospital.id!).subscribe((resp) => {
          if (resp === true) {
            this.loadHospitals();
            Swal.fire(
              'Eliminación Exitosa!',
              'Se ha eliminado el Hospital.',
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

public showModal(hospital: Hospital): void {
  const modalRef = this.modalService.open(ModalImageComponent, {
    size: 'md',
    centered: true,
  });


  modalRef.componentInstance.objeto = hospital;


}
public createHospital(){
  const modalRef = this.modalService.open(ModalHospitalComponent, {
    size: 'md',
    centered: true,
  });
  modalRef.componentInstance.successfulTransaction.subscribe(() => {
    this.loadHospitals()
  });
}


public buscar(termino: string): void {
  console.log(termino);

  if (termino.length === 0) {

    this.listaHospitales = this.listaHospitalTemp
    return
  }

  this.loading = true;
  this.searchService.buscar('hospitales', termino)
    .subscribe((resp) => {
      console.log(resp);
      this.listaHospitales = resp as Hospital[];
      this.loading = false;
    })
}


//

}
