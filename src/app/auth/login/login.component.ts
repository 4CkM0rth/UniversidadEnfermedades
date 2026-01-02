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

  login(): void {
    this.authService.login(this.usuario, this.password)
      .subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Error de login', error);
        }
      );
  }
}
