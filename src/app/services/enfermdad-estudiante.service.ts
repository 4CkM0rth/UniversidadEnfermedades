import { EnfermedadEstudiante } from './../model/enfermedad-estudiante';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EnfermdadEstudianteService {

  private path: string = environment.urlApi + "/enfermedad-estudiante";

  constructor(private http: HttpClient) { }

  listarTodos() {
    return this.http.get<EnfermedadEstudiante[]>(this.path);
  }

  registrar(entidad: EnfermedadEstudiante) {
    return this.http.post<void>(this.path, entidad);
  }

  listarPorIdEstudiante(idEstudiante: number) {
    return this.http.get<EnfermedadEstudiante[]>(`${this.path}/listarPorIdEstudiante/${idEstudiante}`);
  }


}