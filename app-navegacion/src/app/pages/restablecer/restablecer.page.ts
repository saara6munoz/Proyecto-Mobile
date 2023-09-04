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

  async changePassword(){
    localStorage.setItem('password', JSON.stringify(this.newPass));
    console.log(this.newPass);
    console.log(localStorage);

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

