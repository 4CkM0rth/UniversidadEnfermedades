import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

import { GestionarEstudiantesComponent } from './modulos/gestionar-estudiantes/gestionar-estudiantes.component';
import { GestionarEnfermedadesComponent } from './modulos/gestionar-enfermedades/gestionar-enfermedades.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'estudiantes',
    component: GestionarEstudiantesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'enfermedades',
    component: GestionarEnfermedadesComponent,
    canActivate: [AuthGuard]
  },

  { path: '', redirectTo: 'estudiantes', pathMatch: 'full' },
  { path: '**', redirectTo: 'estudiantes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
