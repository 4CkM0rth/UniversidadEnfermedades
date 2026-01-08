import { TipoSangre } from '../model/tipo-sangre';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoSangreService {

  private path: string = environment.urlApi + "/tiposangre";

  constructor(
    private http: HttpClient
  ) { }

  listarTodos(){
    return this.http.get<TipoSangre[]>(this.path);
  }
}
