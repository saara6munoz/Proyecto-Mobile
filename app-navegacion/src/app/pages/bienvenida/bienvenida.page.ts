import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  usuarioString = localStorage.getItem('usuario'); 
  usuarioObj = this.usuarioString ? JSON.parse(this.usuarioString) : null; // Protección anti nulos

  usuario = this.usuarioObj.nombre; // Accedemos al atributo nombre para saludar

  constructor(private router: Router) { }

  ngOnInit() {
  }  

  navegar(){
    this.router.navigate(['login']);
  }
}
