import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string='';
  contrasena: string= '';
  formularioLogin: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder, private alertController: AlertController,
     private navCtrl: NavController, private router: Router, private db:DbService) { 

    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'contrasena': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  async ingresar(){
    //llamada a la API
    this.api.personaLogin(
      this.usuario,
      this.contrasena
    ).subscribe(
      async (respuestaExitosa: any) => { //any nunca es una buena practica
        if(respuestaExitosa.result && respuestaExitosa.result.length > 0) {
          const respuesta = respuestaExitosa.result[0].RESPUESTA;
          if(respuesta === "LOGIN OK"){
            this.db.loginUsuario(this.usuario, this.contrasena).then(async data => {
              if (data == 1) {
                let parametros: NavigationExtras = {
                  state: {
                    usuario: this.usuario,
                    contrasena: this.contrasena,
                  }, replaceUrl: true
                }
                const alert = await this.alertController.create({
                  header: 'Correcto',
                  message: 'Inicio de sesión exitoso!',
                  buttons: ['OK']
                });
                await alert.present();
                this.db.almacenarSesion(this.usuario, this.contrasena)
                this.router.navigate(['bienvenida'], parametros)
              }else {
                const alert = await this.alertController.create({
                  header: 'Error en el inicio de sesion',
                  message: 'Usuario o Contrasena incorrectos',
                  buttons: ['OK']
                });
                await alert.present();
              }
            })
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
  registrar() {
    this.router.navigate(['registro'], { replaceUrl: true });
  }
}
