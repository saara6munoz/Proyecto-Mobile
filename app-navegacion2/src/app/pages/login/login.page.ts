import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = '';
  contrasena: string = '';
  formularioLogin: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder, private alertController: AlertController, private navCtrl: NavController, private router: Router) { 

    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'contrasena': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  async ingresar(){
    //llamada a la API
    this.api.personalogin(
      this.usuario,
      this.contrasena
    ).subscribe(
      (respuesta) => {
        console.log("todo bien desde el servidor!", respuesta);
      },
      (error) => {
        console.log("todo mal desde el servidor!", error);
      }
    )

    var f = this.formularioLogin.value;

    var usuarioString = localStorage.getItem('usuario');
    var usuario = usuarioString ? JSON.parse(usuarioString) : null;
    console.log(usuario)
    if (usuario.nombre == f.nombre && f.password == usuario.password)
    {
      this.navCtrl.navigateForward('/principal');
    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
}

