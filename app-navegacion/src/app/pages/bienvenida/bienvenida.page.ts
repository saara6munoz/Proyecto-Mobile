import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  //usuario: string | null = null;
  usuarioString = localStorage.getItem('usuario');
  usuarioObj = this.usuarioString ? JSON.parse(this.usuarioString) : null;

  usuario = this.usuarioObj.nombre; // Obtener el valor del usuario

  constructor() { }

  ngOnInit() {
  }  

}
