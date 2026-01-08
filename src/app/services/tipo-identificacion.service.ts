import { TipoIdentificacion } from './../model/tipo-identificacion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

  private path: string = environment.urlApi + "/tipoidentificacion";

  constructor(
    private http: HttpClient
  ) { }

    listarTodos(){
    return this.http.get<TipoIdentificacion[]>(this.path);
  }
}
