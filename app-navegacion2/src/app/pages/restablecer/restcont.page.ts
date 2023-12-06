import {ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-restcont',
  templateUrl: './restcont.page.html',
  styleUrls: ['./restcont.page.scss'],
})
export class RestcontPage implements OnInit {
usuario:string="";
contrasena:string="";
contrasenanueva:string="";
contrasenavieja:string="";
isAlertOpen = false;
alertvacio = false;
alertButtons = ['OK'];


  constructor(private dbService: DbService, private router: Router, private alertController: AlertController,private apiService: ApiService) { }
  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.usuario = parametros?.extras.state['usuario'];
      this.contrasenavieja = parametros?.extras.state['contrasena'];
    }
  }
  async confirmar(){
    if (this.contrasena == "" && this.contrasenanueva == ""){
      const alert = await this.alertController.create({
        header: 'Error en el cambio de contraseña',
        message: 'Existen campos vacios. Intentelo denuevo',
        buttons: ['OK']
      });
      await alert.present();
    }
    else{
      if (this.contrasena == this.contrasenavieja){
        if (this.contrasenanueva==this.contrasenavieja){
          const alert = await this.alertController.create({
            header: 'Error en el cambio de contraseña',
            message: 'No puede ser la misma contraseña',
            buttons: ['OK']
          });
          await alert.present();
        }
        else{
          try {
            this.apiService.personaModificarContrasena(this.usuario,this.contrasenanueva,this.contrasenavieja).subscribe(
              async (response: any) => {
                if (response.result[0].RESPUESTA === 'OK') {
                  this.dbService.restablecerContrasena(this.usuario,this.contrasenavieja,this.contrasenanueva,);
                  let parametros: NavigationExtras = {
                    state: {
                      usuario: this.usuario,
                      contrasena: this.contrasena
                    }, replaceUrl: true
                  }
                  this.dbService.cerrarSesion(this.usuario,this.contrasenavieja)
                  const alert = await this.alertController.create({
                    header: 'Contraseña restablecida',
                    message: 'Ingrese sus credenciales nuevamente',
                    buttons: ['OK']
                  });
                  await alert.present();
                  this.router.navigate(['login'],parametros);
                } else {
                  const alert = await this.alertController.create({
                    header: 'Error en el cambio de contraseña',
                    message: 'La contraseña ingresada es incorrecta. Intentelo denuevo',
                    buttons: ['OK']
                  });
                  await alert.present();
                }
              },
            );
          } catch (error) {
            const alert = await this.alertController.create({
              header: 'Error en el cambio de contraseña',
              message: 'Hubo un problema al cambiar la contraseña. Por favor, inténtalo de nuevo.',
              buttons: ['OK']
            });
            await alert.present();
          }
        }
        
      }
      else{
        const alert = await this.alertController.create({
          header: 'Error en el cambio de contraseña',
          message: 'La contraseña ingresada es incorrecta. Intentelo denuevo',
          buttons: ['OK']
        });
        await alert.present();}}}
  volver(){
    let parametros: NavigationExtras = {
      state: {
        usuario: this.usuario,
        contrasena: this.contrasenavieja
      }, replaceUrl: true
    }
  this.router.navigate(['principal'],parametros);
  }
}