import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular'; //AlertController para el manejo de mensajes emergentes y dialogos
import { Usuario } from 'src/app/models/usuario.models';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  model = new Usuario;
  // FormGroup ya nos proporciona una estructura organizada para controlar nuestros formularios, en este caso validaciones
  formularioRegistro: FormGroup;
  
  usuario: string = '';
  correo: string = '';
  contrasena: string = '';
  nombre: string = '';
  apellido: string = '';


  constructor(private api: ApiService, private fb: FormBuilder, private alertController: AlertController, private navCtrl: NavController, private db: DbService ) {
    // Crea y configura un FormGroup junto con sus controles y reglas de validación en un formulario.
    this.formularioRegistro = this.fb.group({
      //En esta sección se válida que se requieren los datos 
      'usuario': new FormControl("", Validators.required),
      'correo': new FormControl("", Validators.required),
      'contrasena': new FormControl("", Validators.required),
      'nombre': new FormControl(""),
      'apellido': new FormControl("")
    });
  }

  ngOnInit() {
  }

// Las funciones asincronicas permiten que acciones se ejecuten en segundo plano sin interrumpir el hilo principal
  async newUsuario() {
    //Vamos a obtener el formulario del registro de nuestro HTML
    if (this.formularioRegistro.invalid) {// Es invalido si no se cumplen las validaciones definidas
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
      // Queda a la espera de la alerta
      await alert.present();
      return;
    }
    this.api.personaAlmacenar(
      this.usuario,
      this.correo,
      this.contrasena,
      this.nombre,
      this.apellido
    ).subscribe(
      async (respuestaExitosa: any) => { //any nunca es una buena practica
        console.log(respuestaExitosa);
        if(respuestaExitosa.result && respuestaExitosa.result.length > 0) {
          const respuesta = respuestaExitosa.result[0].RESPUESTA;
          if(respuesta === "OK"){
            this.db.almacenarUsuario(
              this.usuario,
              this.contrasena,
              this.correo,
              this.nombre,
              this.apellido
            );
            const alert = await this.alertController.create({
              header: 'Éxito',
              message: 'Registro exitoso!',
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
            console.log("//redirige a todo bien")
          }else if(respuesta === "ERR01"){
            const alert = await this.alertController.create({
              header: 'Precaución',
              message: 'El Usuario ingresado ya existe, elige otro',
              buttons: [
                {
                  text: 'Aceptar',
                }
              ]
            });
            await alert.present();
            }else if (respuesta === "ERR02"){
            const alert = await this.alertController.create({
              header: 'Precaución',
              message: 'El Correo ingresado ya existe, elige otro',
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