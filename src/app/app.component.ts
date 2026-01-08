import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UniversidadFront';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
