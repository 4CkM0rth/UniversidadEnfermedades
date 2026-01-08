import { Component, OnInit } from '@angular/core';
import { GuardarEstudiantesComponent } from '../guardar-estudiantes/guardar-estudiantes.component';
import {MatDialog} from '@angular/material/dialog';
import { Estudiante } from '../../model/estudiante';
import { EstudianteService } from '../../services/estudiante.service';
import { ModalConfirmarEliminarComponent } from '../modal-confirmar-eliminar/modal-confirmar-eliminar.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-gestionar-estudiantes',
  templateUrl: './gestionar-estudiantes.component.html',
  styleUrls: ['./gestionar-estudiantes.component.css']
})
export class GestionarEstudiantesComponent implements OnInit {

  public estudiantes: Estudiante[] = [];

  constructor(
    private servicioEstudiante: EstudianteService,
    public dialog: MatDialog,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
   this.listarTodos();
  }

    private listarTodos(){
    this.servicioEstudiante.listarTodos().subscribe(res => {
      this.estudiantes = res;
    },error =>{
      console.log("Ha ocurrido un error al listar los estudiantes");
    });
  }

  public modalNuevoEstudiante(id: number) {
    let dialogRef = this.dialog.open(GuardarEstudiantesComponent, {
  height: '700px',
  width: '800px',
  data: {
    id: id
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.listarTodos();
      }
    });
  }

  public eliminar(id: number){
    let dialogRef = this.dialog.open(ModalConfirmarEliminarComponent);
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.servicioEstudiante.eliminar(id).subscribe(res =>{
          this.toast.success("Ha eliminado el estudiante", "ELIMINADO");
          this.listarTodos();
        }, error => {
          console.log("Ha ocurrido un error al eliminar el estudiante");
        });
      }
    });
  }


}
