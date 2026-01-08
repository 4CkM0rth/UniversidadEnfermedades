import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { GuardarEnfermedadesComponent } from '../guardar-enfermedades/guardar-enfermedades.component';
import { EnfermedadEstudiante } from '../../model/enfermedad-estudiante';
import { EnfermdadEstudianteService } from '../../services/enfermdad-estudiante.service';
import { Estudiante } from '../../model/estudiante';
import { FormControl } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';


@Component({
  selector: 'app-gestionar-enfermedades',
  templateUrl: './gestionar-enfermedades.component.html',
  styleUrls: ['./gestionar-enfermedades.component.css']
})
export class GestionarEnfermedadesComponent implements OnInit {

  public enfermedadesTabla: EnfermedadEstudiante[] = [];
  public idEstudiante: FormControl = new FormControl();
  public estudiantes: Estudiante[] = [];

  constructor(
    public dialog: MatDialog,
    private servicioEnfermedad: EnfermdadEstudianteService,
    private servicioEstudiante: EstudianteService
  ) {}

  ngOnInit(): void {
    this.servicioEstudiante.listarTodos().subscribe(
      res => {
        this.estudiantes = res;
        this.listarTodos();
      },
      error => console.log("Error al cargar estudiantes")
    );
  }

  private listarTodos() {
    this.servicioEnfermedad.listarTodos().subscribe(
      res => {
        this.enfermedadesTabla = res;
      },
      error => console.error(error)
    );
  }

  public filtrar() {
    this.servicioEnfermedad
      .listarPorIdEstudiante(this.idEstudiante.value)
      .subscribe(
        res => {
          this.enfermedadesTabla = res; // ✅ AQUÍ ESTÁ LA CLAVE
        },
        error => {
          console.log("Ha ocurrido al filtrar la enfermedad por el estudiante");
        }
      );
  }

  public modalGuardarEnfermedad(id: number) {
    let dialogRef = this.dialog.open(GuardarEnfermedadesComponent, {
      height: '700px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.listarTodos();
      }
    });
  }
}
