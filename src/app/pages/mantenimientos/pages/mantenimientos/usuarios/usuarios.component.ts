import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { CargaUsuario } from 'src/app/Interfaces/cargar-usuarios.interface';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../../../auth/services/usuario.service';
import { SearchService } from '../../../../../services/search.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from "sweetalert2";
import { ModalImageComponent } from '../../../../../components/modal-image/modal-image.component';




@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public listaUsuarios: Usuario[] = [];
  public listaUsuariosTemp: Usuario[] = [];
  public totalUsuario: number = 0;
  public desde: number = 0;
  public loading: boolean = true;


  @ViewChild('imageModal') imageModal: any;

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly searchService: SearchService,
    private readonly modalService: NgbModal

  ) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  public loadUsuarios(): void {
    this.loading = true;
    this.usuarioService.cargarListaUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {


        this.totalUsuario = total;
        if (usuarios.length !== 0) {
          this.listaUsuarios = usuarios;
          this.listaUsuariosTemp = usuarios;
        }
        this.loading = false;

      })
  }

  public cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuario) {
      this.desde = this.totalUsuario - 5;
    }
    this.loadUsuarios()
  }


  public buscar(termino: string): void {
    console.log(termino);

    if (termino.length === 0) {

      this.listaUsuarios = this.listaUsuariosTemp
      return
    }

    this.loading = true;
    this.searchService.buscarUsuarios('usuarios', termino)
      .subscribe((resp) => {
        console.log(resp);
        this.listaUsuarios = resp;
        this.loading = false;
      })
  }
  public eliminarLinea(data: Usuario): void {

    console.log(data);
    Swal.fire({
      title: `Esta seguro de eliminar el usuario ${data.name} ?`,
      text: "La accion no se podra revertir!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deletUsuario(data.uid).subscribe((resp) => {
          if (resp === true) {
            this.loadUsuarios();
            Swal.fire(
              'Eliminación Exitosa!',
              'Se ha eliminado el usuario.',
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

  public isCurrentUser(user: Usuario) {
    if (user.uid === this.usuarioService._usuario.uid) {
      return true;
    } else {
      return false;
    }
  }

  public cambiarRole(usuario: Usuario) {

    console.log(usuario);

    this.usuarioService.saveUser(usuario).subscribe(
      (resp) => {
        console.log(resp);

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

      })
  }


  public showModal(usuario: Usuario): void {
    const modalRef = this.modalService.open(ModalImageComponent, {
      size: 'md',
      centered: true,
    });


    modalRef.componentInstance.objeto = usuario;


    /*modalRef.componentInstance.successfulTransaction.subscribe(() => {
      this.loadUsuarios()
    });*/

  }




}
