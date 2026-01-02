import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';

import { GestionarEstudiantesComponent } from './modulos/gestionar-estudiantes/gestionar-estudiantes.component';
import { GestionarEnfermedadesComponent } from './modulos/gestionar-enfermedades/gestionar-enfermedades.component';
import { GuardarEstudiantesComponent } from './modulos/guardar-estudiantes/guardar-estudiantes.component';
import { GuardarEnfermedadesComponent } from './modulos/guardar-enfermedades/guardar-enfermedades.component';
import { ModalConfirmarEliminarComponent } from './modulos/modal-confirmar-eliminar/modal-confirmar-eliminar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionarEstudiantesComponent,
    GestionarEnfermedadesComponent,
    GuardarEstudiantesComponent,
    GuardarEnfermedadesComponent,
    ModalConfirmarEliminarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'es' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }