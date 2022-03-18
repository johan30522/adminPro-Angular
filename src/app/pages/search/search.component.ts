import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalImageComponent } from '../../components/modal-image/modal-image.component';
import { ModalMedicoComponent } from '../mantenimientos/pages/mantenimientos/modal-medico/modal-medico.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly searchService: SearchService,
    private readonly modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.busqueda(params.termino);
      }
    );
  }

  public editMedico(medico:Medico){
    const modalRef = this.modalService.open(ModalMedicoComponent, {
      size: 'md',
      centered: true,
    });

    
    modalRef.componentInstance.medico = medico;
    modalRef.componentInstance.successfulTransaction.subscribe(() => {
      //this.loadMedicos()
    });
  }

  public busqueda(termino: string) {
    this.searchService.busquedaGlobalObjetos(termino).subscribe(
      (result:any) => {
        console.log(result);
        
        this.usuarios=result.usuarios;
        this.medicos=result.medicos;
        this.hospitales=result.hospitales;
      }
    )
  }


}
