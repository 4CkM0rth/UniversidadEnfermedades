import { Estudiante } from './../model/estudiante';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private path: string = environment.urlApi + "/estudiante";

  constructor(
    private http: HttpClient
  ) { }

  public listarTodos(){
    return this.http.get<Estudiante[]>(this.path);
  }

  public listarPorId(id: number){
    return this.http.get<Estudiante>(`${this.path}/${id}`);
  }

    registrar(estudiante: Estudiante){
    return this.http.post<void>(this.path,estudiante);
  }

  actualizar(estudiante: Estudiante){
    return this.http.put<void>(this.path,estudiante);
  }

  eliminar(id: number){
    return this.http.delete<void>(`${this.path}/${id}`);
  }
}
