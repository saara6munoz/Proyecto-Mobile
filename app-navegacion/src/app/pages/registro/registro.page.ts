import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  
  constructor(public fb: FormBuilder,
    public alertController: AlertController, private navCtrl: NavController ) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
  
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

    var usuario = {
      nombre: f.nombre,
      password: f.password
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));
  }

}

