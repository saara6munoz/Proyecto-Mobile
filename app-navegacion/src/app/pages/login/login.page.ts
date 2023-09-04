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


    if(usuario.nombre == f.nombre && passSinString == f.password){
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

/*import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  //mdl_usuario: string = ''
  //mdl_pass: string = ''

  //isAlertOpen = false;
  //alertButtons = ['OK'];

  constructor(public fb: FormBuilder,
    public alertController: AlertController) {
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
    var usuario = usuarioString ? JSON.parse(usuarioString) : null;


    if(usuario.nombre == f.nombre && usuario.password == f.password){
      console.log('Ingresado');
    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }
  }

 /* navegar() {
    if(this.mdl_usuario == 'Christian' && this.mdl_pass == 'costra14'){
      let parametros: NavigationExtras={
        state: {
          user: this.mdl_usuario,
          pass: this.mdl_pass
        }
      }
      this.router.navigate(['principal'], parametros);
    } else {
      this.isAlertOpen = true;
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
*/