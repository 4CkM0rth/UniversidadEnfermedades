import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  usuario = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.usuario, this.password).subscribe({
      next: res => {
        localStorage.setItem('token', res.access_token);
        console.log('TOKEN GUARDADO', res.access_token);

              this.router.navigate(['/estudiantes']);

      },
      error: err => {
        console.error('Error de login', err);
      }
    });
  }

}
