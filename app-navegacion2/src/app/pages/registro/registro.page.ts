import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular'; //AlertController para el manejo de mensajes emergentes y dialogos
import { Usuario } from 'src/app/models/usuario.models';
import { ApiService } from 'src/app/services/api.service';
//import { PacienteI } from '../../models/response.interface';
import { ResponseI } from '../../models/response.interface';


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


  constructor(private api: ApiService, private fb: FormBuilder, private alertController: AlertController, private navCtrl: NavController ) {
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

  @Output()
  addUserEventFromParent = new EventEmitter<Usuario>();

  onSubmit() {
    formularioRegistro: FormGroup;
      this.addUserEventFromParent.emit(this.formularioRegistro.value);
      console.log(this.formularioRegistro.value)
      alert("estoy aqui")
  }

  newUsuario() {
    this.api.personaAlmacenar(
      this.usuario, 
      this.correo,
      this.contrasena,
      this.nombre,
      this.apellido).subscribe(
        // Manejar la respuesta si es necesario
        (respuesta) => {
          console.log('Usuario almacenado correctamente:', respuesta);
        },
        // Manejar errores si los hay
        (error) => {
          console.error('Error al almacenar usuario:', error);
        }
      );
  }


  postForm(form:Usuario){
    this.api.postUsuario(form).subscribe(data => {
      console.log(data)
    })
  }

}
