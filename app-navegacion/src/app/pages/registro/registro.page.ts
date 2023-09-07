import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular'; //AlertController para el manejo de mensajes emergentes y dialogos

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  // FormGroup ya nos proporciona una estructura organizada para controlar nuestros formularios, en este caso validaciones
  formularioRegistro: FormGroup;
  
  constructor(private fb: FormBuilder, private alertController: AlertController, private navCtrl: NavController ) {
    // Crea y configura un FormGroup junto con sus controles y reglas de validación en un formulario.
    this.formularioRegistro = this.fb.group({
      //En esta sección se válida que se requieren los datos 
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }
// Las funciones asincronicas permiten que acciones se ejecuten en segundo plano sin interrumpir el hilo principal
  async guardar(){
    //Vamos a obtener el formulario del registro de nuestro HTML
    var f = this.formularioRegistro.value;
    // Es invalido si no se cumplen las validaciones definidas
    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
      // Queda a la espera de la alerta
      await alert.present();
      return;
    }else{
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Registro exitoso!',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.navCtrl.navigateForward('/bienvenida')
            }
          }
          ],
      });
  
      await alert.present();
    }
    // Esta variable almacena el objeto usuario con el nombre y la constraseña que obtiene del formulario 
    var usuario = {
      nombre: f.nombre,
      password: f.password
    }
    // Se establece el item de usuario y convierte el objeto en un JSON
    localStorage.setItem('usuario',JSON.stringify(usuario));
  }

}
