import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from '../../model/estudiante';
import { EstudianteService } from '../../services/estudiante.service';
import { EnfermdadEstudianteService } from '../../services/enfermdad-estudiante.service';
import { EnfermedadEstudiante } from '../../model/enfermedad-estudiante';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-guardar-enfermedades',
  templateUrl: './guardar-enfermedades.component.html',
  styleUrls: ['./guardar-enfermedades.component.css']
})
export class GuardarEnfermedadesComponent implements OnInit {

  public formEnfermedad: FormGroup;
  public listaEstudiantes: Estudiante[] = [];

  constructor(
    private servicioEstudiante: EstudianteService,
    private servicioEnfermedad: EnfermdadEstudianteService,
    private toast: ToastrService,
    private dialogRef: MatDialogRef<GuardarEnfermedadesComponent>
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarEstudiantes();
  }

  private inicializarFormulario(){
    this.formEnfermedad = new FormGroup({
      idEstudiante: new FormControl(null, Validators.required), 
      nombre: new FormControl(null, Validators.required),
      observacion: new FormControl(null, Validators.required)
    });
  }

  public guardar() {
    let estudiante: Estudiante = new Estudiante();
    estudiante.id = this.formEnfermedad.controls['idEstudiante'].value;


    let enfermedadEstudiante: EnfermedadEstudiante = new EnfermedadEstudiante();
    enfermedadEstudiante.estudiante = estudiante;
    enfermedadEstudiante.nombre = this.formEnfermedad.controls['nombre'].value;
    enfermedadEstudiante.observacion = this.formEnfermedad.controls['observacion'].value;


    this.servicioEnfermedad.registrar(enfermedadEstudiante).subscribe(res => {
        this.toast.success("Se ha registrado la enfermedad", "CORRECTO");
        this.dialogRef.close(true);
    }, error =>{
      console.log("Ha ocurrido un error al registrar la enfermedad");
    });
  }

  private cargarEstudiantes(){
    this.servicioEstudiante.listarTodos().subscribe(res =>{
      this.listaEstudiantes = res;
    }, error =>{
      console.log("Ha ocurrido un error al cargar los estudiantes");
    });
  }
}
