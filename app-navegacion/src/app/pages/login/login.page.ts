import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(private fb: FormBuilder, private alertController: AlertController, private navCtrl: NavController, private router: Router) { 

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })

  }

  ngOnInit() {
  }

  async ingresar(){
    var f = this.formularioLogin.value;

    var usuarioString = localStorage.getItem('usuario');
    var passwordString = localStorage.getItem('password');
    var passSinString = JSON.parse(passwordString ?? 'null');
    var usuario = usuarioString ? JSON.parse(usuarioString) : null;


    if (usuario.nombre == f.nombre && (f.password == usuario.password || f.password == passSinString)) //(passSinString === f.password ||
    {
      this.navCtrl.navigateForward('/principal');
    }else{
      console.log(passSinString);
      console.log(f.password);
      console.log(localStorage);
      console.log(usuario.password);
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }
  }

}

