import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})



export class DbService {

  constructor(private sqlite: SQLite) { 
    this.crearTablas();
    this.crearSesion();
  }

  crearTablas(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('create table if not exists usuario (usuario varchar(30), contrasena varchar(30), correo varchar(75), nombre varchar(30), apellido varchar(30))', [])
          .then(() => console.log('SMP: EJECUCION CORRECTA DE SQL'))
          .catch(e => console.log('SMP: ERROR AL CREAR LA TABLA PERSONA: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('SMP: ERROR AL EJECUTAR SCRIPT: ' + JSON.stringify(e)));
  }
  crearSesion(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS SESION(USUARIO VARCHAR(30),CONTRASENA VARCHAR(30))', [])
          .then(() => console.log('SMP: SESION CREADA'))
          .catch(e => console.log('SMP: ERROR AL CREAR SESION: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('SMP: ERROR AL EJECUTAR SCRIPT' + JSON.stringify(e)));
  }

  almacenarUsuario(usuario: string, contrasena: string, correo: string, nombre: string, apellido: string ) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('insert into usuario values (?, ?, ?, ?, ?)', [usuario, contrasena, correo, nombre, apellido])
          .then(() => console.log('SMP: USUARIO ALMACENADO CORRECTAMENTE'))
          .catch(e => console.log('SMP: ERROR AL ALMACENAR USUARIO: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('SMP: ERROR AL EJECUTAR SCRIPT EJECUCION DE ALMACENAR USUARIO: ' + JSON.stringify(e)));
  }

  almacenarSesion(usuario: string, contrasena: string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO SESION (USUARIO, CONTRASENA) VALUES (?, ?)', [usuario, contrasena])
          .then(() => console.log('FSR: PERSONA ALMACENADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }

  loginUsuario(usuario: string, contrasena: string){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('select count(usuario) as cantidad from usuario where usuario = ? and contrasena = ?', [usuario, contrasena])
          .then((data) => {
            return data.rows.item(0).cantidad;
          })
          .catch(e => console.log('SMP: NO EXISTE EL USUARIO: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('SMP: ERROR AL EJECUTAR SCRIPT: ' + JSON.stringify(e)));
  }

  loginSesion(){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('select count(usuario) as cantidad from sesion', [])
          .then((data) => {
            return data.rows.item(0).cantidad;
          })
          .catch(e => console.log('SMP: NO EXISTE EL USUARIO: ' + JSON.stringify(e)));  
      })
      .catch(e => console.log('SMP: ERROR AL EJECUTAR SCRIPT: ' + JSON.stringify(e)));
  }

  infoUsuario(usuario: string, contrasena: string){
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('select correo, nombre, apellido from usuario where usuario = ? and contrasena = ?', [usuario, contrasena])
          .then((data) => {
            let objeto: any = {};
            objeto.nombre = data.rows.item(0).nombre;
            objeto.correo = data.rows.item(0).corre;
            objeto.apellido = data.rows.item(0).apellido;
            
            return objeto;
          })
          .catch(e => console.log('SMP: NO EXISTE EL USUARIO: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('SMP: ERROR AL EJECUTAR SCRIPT: ' + JSON.stringify(e)));
  }

  infoSesion() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('select usuario, contrasena from sesion', [])
          .then((data) => {
            let objeto: any = {};
            objeto.usuario = data.rows.item(0).USUARIO
            objeto.contrasena = data.rows.item(0).CONTRASENA
            
            return objeto;
          })
          .catch(e => console.log('SMP: NO EXISTE EL USUARIO: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('SMP: ERROR AL EJECUTAR SCRIPT: ' + JSON.stringify(e)));
  }

  cambiarContrasena(usuario: string, contrasenaActual: string, contrasenaNueva: string){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('update usuario set contrasena = ? where usuario = ? and contrasena = ?', [contrasenaNueva, usuario, contrasenaActual])
          .then(() => console.log('SMP: USUARIO MODIFICADO CORRECTAMENTE'))
          .catch(e => console.log('SMP: ERROR AL MODIFICAR EL USUARIO: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('SMP: ERROR AL EJECUTAR SCRIPT: ' + JSON.stringify(e)));
  }

  cerrarSesion(usuario: string,contrasena:string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('delete from sesion where usuario = ? and contrasena = ?', [usuario,contrasena])
          .then(() => console.log('SMP: SESION CERRADA CORRECTAMENTE'))
          .catch(e => console.log('SMP: ERROR AL CERRAR SESION: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('SMP: ERROR AL EJECUTAR SCRIPT: ' + JSON.stringify(e)));
  }
}
