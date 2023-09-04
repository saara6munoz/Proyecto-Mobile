import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: string = '';
  contrasena: string = '';
  color: string = 'light';

  constructor(private router: Router) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if(parametros?.extras.state){
      this.usuario = parametros?.extras.state['user'];
    }
  }

  fav() {
    if(this.color == 'light'){
      this.color = 'alert';
    } else {
      this.color = 'light';
    }
  }
  // this.color = this.color == 'light' ? 'danger' : 'light'; <-- es lo mismo que el if de arriba
}
