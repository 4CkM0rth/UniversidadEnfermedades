import { Estudiante } from '../../model/estudiante';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoIdentificacion } from '../../model/tipo-identificacion';
import { TipoSangre } from '../../model/tipo-sangre';
import { TipoIdentificacionService } from '../../services/tipo-identificacion.service';
import { TipoSangreService } from '../../services/tipo-sangre.service';
import { EstudianteService } from '../../services/estudiante.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog'


@Component({
  selector: 'app-guardar-estudiantes',
  templateUrl: './guardar-estudiantes.component.html',
  styleUrls: ['./guardar-estudiantes.component.css']
})
export class GuardarEstudiantesComponent implements OnInit {

  public formEstudiante: FormGroup;
  public selectTipoIdentificacion: TipoIdentificacion[] = [];
  public selectTipoSangre: TipoSangre[] = [];

  constructor(
    private servicioTipoIdentificacion: TipoIdentificacionService,
    private servicioTipoSangre: TipoSangreService,
    private servicioEstudiante: EstudianteService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<GuardarEstudiantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarTipoIdentificacion();
    this.cargarTipoSangre();
    this.cargarDatosEdicion();
  } 

  private inicializarFormulario() {
    this.formEstudiante = new FormGroup({
      idTipoIdentificacion: new FormControl(null, Validators.required),
      numeroIdentificacion: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      fechaNacimiento: new FormControl(null, Validators.required),
      idTipoSangre: new FormControl(null, Validators.required)
    });
  }

  private cargarTipoIdentificacion(){
    this.servicioTipoIdentificacion.listarTodos().subscribe(res =>{     
      this.selectTipoIdentificacion = res;
    },error=>{
      console.log("Ha ocurrido un error al cargar los tipos de identificacion");
    });
  }

  private cargarTipoSangre(){
    this.servicioTipoSangre.listarTodos().subscribe(res => {
      this.selectTipoSangre = res;
    },error=>{
      console.log("Ha ocurrido un error al cargar los tipos de sangre");
    });

  }

  public guardar() {

    let tipoIdentificacion: TipoIdentificacion = new TipoIdentificacion();
    tipoIdentificacion.id = this.formEstudiante.controls['idTipoIdentificacion'].value;

    let tipoSangre: TipoSangre = new TipoSangre();
    tipoSangre.id = this.formEstudiante.controls['idTipoSangre'].value;
    
    let estudiante: Estudiante = new Estudiante();
    estudiante.tipoIdentificacion = tipoIdentificacion;
    estudiante.numeroIdentificacion = this.formEstudiante.controls['numeroIdentificacion'].value;
    estudiante.nombre = this.formEstudiante.controls['nombre'].value;
    estudiante.apellido = this.formEstudiante.controls['apellido'].value;
    estudiante.fechaNacimiento = this.formEstudiante.controls['fechaNacimiento'].value;
    estudiante.tipoSangre = tipoSangre;

    if(this.data.id){
      estudiante.id =this.data.id;
      this.actualizar(estudiante);
    }else{
      this.registrar(estudiante);
    }

    this.registrar(estudiante);

  }

  private registrar(estudiante: Estudiante) {
    this.servicioEstudiante.registrar(estudiante).subscribe(res => {
      this.toast.success("Ha registrado el estudiante","CORRECTO");
      this.dialogRef.close(true);
    },error => {
      console.log("Ha ocurrido un error al registrar");
    });
  }

  private cargarDatosEdicion(){
    if(this.data.id !=0){
      this.servicioEstudiante.listarPorId(this.data.id).subscribe(res => {

        this.formEstudiante.setValue({
        idTipoIdentificacion: res.tipoIdentificacion.id,
        numeroIdentificacion: res.numeroIdentificacion,
        nombre: res.nombre,
        apellido: res.apellido,
        fechaNacimiento: new Date (`${res.fechaNacimiento} 00:00:00`),
        idTipoSangre: res.tipoSangre.id
        });
      }, error => {
        console.log("Ha ocurrido un error al listar el id del estudiante");
      });
    }
  }


  private actualizar(estudiante: Estudiante) {
    this.servicioEstudiante.actualizar(estudiante).subscribe(res => {
      this.toast.success("Ha actualizado el estudiante","CORRECTO");
      this.dialogRef.close(true);
    },error => {
      console.log("Ha ocurrido un error al actualizar");
    });
  }
}
