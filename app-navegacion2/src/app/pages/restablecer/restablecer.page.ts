import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder 
} from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  contrasenaNueva: string='';
  usuario: string='';
  contrasenaActual: string='';
  formularioRestablecer: FormGroup;

  constructor(private db:DbService, private api: ApiService, private alertController: AlertController,  private fb: FormBuilder, private navCtrl: NavController, private router:Router) {

    this.formularioRestablecer = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'contrasenaNueva': new FormControl("",Validators.required),
      'contrasenaActual': new FormControl("",Validators.required)
    })
   }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.usuario = parametros?.extras.state['usuario'];
      this.contrasenaActual = parametros?.extras.state['contrasena'];
    }
  }
  

   async updateUserPassword() {
        //Vamos a obtener el formulario del registro de nuestro HTML
    if (this.formularioRestablecer.invalid) {
      // Es invalido si no se cumplen las validaciones definidas
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
      // Queda a la espera de la alerta
      await alert.present();
      return;
    }else{
        if (this.contrasenaActual==this.contrasenaNueva){
          const alert = await this.alertController.create({
            header: 'Error en el cambio de contraseña',
            message: 'No puede ser la misma contraseña',
            buttons: ['OK']
          });
        await alert.present();
      }
    }
    //llamada a la API
    this.api.personaModificarContrasena(
      this.usuario,
      this.contrasenaNueva,
      this.contrasenaActual
    ).subscribe(
      async (respuestaExitosa: any) => { //any nunca es una buena practica
        console.log(respuestaExitosa);
        if(respuestaExitosa.result && respuestaExitosa.result.length > 0) {
          const respuesta = respuestaExitosa.result[0].RESPUESTA;
          if(respuesta === "OK"){
            this.db.cambiarContrasena(
              this.usuario,
              this.contrasenaActual,
              this.contrasenaNueva
              );
            let parametros: NavigationExtras = {
              state: {
                usuario: this.usuario,
                contrasena: this.contrasenaActual
              }, replaceUrl: true
            }
            this.db.cerrarSesion(this.usuario,this.contrasenaActual)
            const alert = await this.alertController.create({
              header: 'Correcto',
              message: 'Sesión finalizada con éxito!',
              buttons: [
                {
                  text: 'Aceptar',
                  handler: () => {
                    this.router.navigate(['login'],parametros);
                  }
                }
              ]
            });
            await alert.present();
          }else if(respuesta === "ERR01"){
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