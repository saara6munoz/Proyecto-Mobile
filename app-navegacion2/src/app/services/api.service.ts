import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.models';
import { UsuarioI } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ruta_usuarios 
  = 'https://fer-sepulveda.cl/API_PRUEBA_2/api-service.php';

  ruta_aves = 'https://aves.ninjas.cl/api/birds';

  constructor(private http: HttpClient) { }
  listarAves() {
    return this.http.get(this.ruta_aves).pipe();
  }

  listarUsuarios() {
    return this.http.get(this.ruta_usuarios).pipe();
  }

  personaAlmacenar (usuario: string, correo: string, contrasena: string, nombre: string, apellido: string) {
    return this.http.post(this.ruta_usuarios, {
      nombreFuncion: 'UsuarioAlmacenar',
      parametros: [
      usuario, correo, contrasena, nombre, apellido
  ]
  }).pipe();
  }

  addUsuario(usuario: Usuario): Observable<number> {
    return this.http.post<number>(this.ruta_usuarios, usuario)
      .pipe();
  }

  personalogin(usuario: string, contrasena: string) {
    return this.http.post(this.ruta_usuarios, {
      nombreFuncion: 'Usuariologin',
      parametros: [
        usuario, contrasena
      ]
    }).pipe();
    }

  personaModificarContrasena(usuario: string, contrasenaNueva: string, contrasenaActual: string) {
    return this.http.patch(this.ruta_usuarios, {
    nombreFuncion: 'UsuarioModificarContrasena',
    parametros: [
    usuario, contrasenaNueva, contrasenaActual
    ]
  }).pipe();
}

  }


