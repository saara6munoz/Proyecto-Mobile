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

  usuario: string='';
  contrasena: string= '';
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
      async (respuestaExitosa: any) => { //any nunca es una buena practica
        console.log(respuestaExitosa);
        if(respuestaExitosa.result && respuestaExitosa.result.length > 0) {
          const respuesta = respuestaExitosa.result[0].RESPUESTA;
          if(respuesta === "LOGIN OK"){
            const alert = await this.alertController.create({
              header: 'Correcto',
              message: 'Login exitoso!',
              buttons: [
                {
                  text: 'Aceptar',
                  handler: () => {
                    this.navCtrl.navigateForward('/bienvenida');
                  }
                }
              ]
            });
            await alert.present();
          }else if(respuesta === "LOGIN NOK"){
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'Credenciales Inválidas',
              buttons: [
                {
                  text: 'Aceptar',
                }
              ]
            });
            await alert.present();
            }
        }else{
            console.error('Respuesta inesperada de la API');
        }
      },
      (error) => {
        console.error('Error al almacenar usuario:', error);
        // Manejar errores aquí, si es necesario
      });
    }
  }

