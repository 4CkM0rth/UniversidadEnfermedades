import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private path: string = environment.urlApi + "/auth";

  constructor(private http: HttpClient) {}

  login(usuario: string, password: string) {
    return this.http.post<any>(`${this.path}/login`, {
      usuario,
      password
    });
  }

  register(usuario: string, password: string) {
    return this.http.post<any>(`${this.path}/register`, {
      usuario,
      password
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogged(): boolean {
    return !!this.getToken();
  }
}
