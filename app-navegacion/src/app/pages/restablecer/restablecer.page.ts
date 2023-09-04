import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  newPass: string='';
  constructor() { }

  ngOnInit() {
  }

  changePassword(){
    var usuarioString = localStorage.getItem('usuario');
    var usuario = usuarioString ? JSON.parse(usuarioString) : null;
    localStorage.setItem('password', JSON.stringify(this.newPass));
    console.log(this.newPass);
    console.log(localStorage);


  }
/*
    var usuarioString = localStorage.getItem('usuario');
    var usuarioObj = usuarioString ? JSON.parse(usuarioString) : null;

    var nuevaPass = usuarioObj.password = 'this.newPass';

    localStorage.setItem('usuario', JSON.stringify(nuevaPass));
    console.log(nuevaPass);
    localStorage.setItem('usuario', JSON.stringify(this.newPass));
    console.log(this.newPass);*/

  

}

