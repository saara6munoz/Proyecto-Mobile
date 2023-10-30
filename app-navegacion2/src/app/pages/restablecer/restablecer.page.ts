import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  newPass: string='';
  constructor(private alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
  }

  updateUserPassword(newPassword: string): void {
    const userData = localStorage.getItem('usuario');

    if(userData){
      const usuario = JSON.parse(userData); // JSON.parse para convertir de JSON a Objeto
      usuario.password = newPassword
      const updatedUserData  = JSON.stringify(usuario); // JSON.stringify para convertir un Objeto a JSON
      localStorage.setItem('usuario', updatedUserData);
      console.log(localStorage)
    }
  }

  async updatePassword() {
    this.updateUserPassword(this.newPass);
    console.log(localStorage)

    const alert = await this.alertController.create({
      header: 'Tu contraseña se ha restablecido correctamente',
      message: 'Ahora puedes volver a acceder con la nueva contraseña',
      buttons: [
        {
          text: 'Aceptar', 
          handler: () => {
            this.navCtrl.navigateForward('/login')
          }
        }
      ],
    });
    await alert.present();
  }

}