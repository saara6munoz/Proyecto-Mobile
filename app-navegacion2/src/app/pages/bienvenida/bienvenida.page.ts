import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class BienvenidaPage implements OnInit {
  usuario: string = "";
  contrasena: string = "";
  correo: string = "";
  apellido: string = "";
  nombre: string = "";
  constructor(private router: Router, private db: DbService) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.usuario = parametros?.extras.state['usuario'];
      this.contrasena = parametros?.extras.state['contrasena'];
    }
    if (this.usuario === "") {
      this.db.infoSesion().then(data => {
        this.usuario = data.usuario
        this.contrasena = data.contrasena
        this.infouser()
      });
    }
    this.infouser()
  }
  infouser() {
    this.db.infoUsuario(this.usuario, this.contrasena).then(data => {
      this.correo = data.correo
      this.apellido = data.apellido
      this.nombre = data.nombre
    })
  }
  cerrarsesion() {
    this.db.cerrarSesion(this.usuario, this.contrasena)
    this.router.navigate(['login'], { replaceUrl: true });
  }

  cambiarContrasena() {
    let parametros: NavigationExtras = {
      state: {
        usuario: this.usuario,
        contrasena: this.contrasena
      }, replaceUrl: true
    }
    this.router.navigate(['restablecer'], parametros);
  }
}