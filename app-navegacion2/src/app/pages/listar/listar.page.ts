import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Usuario } from '../../models/usuario.models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  usuarioListObject?:Usuario[];
  lista_usuarios: any[] = [];
  lista_aves: any[] = [];
  showNewUsuario = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    //this.listarFeriados();
    this.listarAves();
  }

  async listarUsuarios() {
    let data = this.apiService.listarUsuarios();
    let respuesta = await lastValueFrom(data);

    let jsonTexto = JSON.stringify(respuesta);
    let json = JSON.parse(jsonTexto);

    for(let x = 0; x < json['data'].length; x++) {
      this.lista_usuarios.push(json['data'][x]);
    }
  }

  showAddUsuarioForm() {
    this.showNewUsuario = !this.showNewUsuario;
  }

  agregarUsuario(usuario: Usuario){
    this.apiService.addUsuario(usuario).subscribe(data => {
      usuario.id = data;
      this.usuarioListObject?.push(usuario);
    });
    this.showAddUsuarioForm();
  } 

  async listarAves() {
    let data = this.apiService.listarAves();
    let respuesta = await lastValueFrom(data);

    let jsonTexto = JSON.stringify(respuesta);
    let json = JSON.parse(jsonTexto);

    for(let x = 0; x < json.length; x++) {
      this.lista_aves.push(json[x]);
    }
  }

}
