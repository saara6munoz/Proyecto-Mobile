export class Usuario {
    id: number;
    usuario: string;
    correo: string;
    contrasena: string;
    nombre: string;
    apellido: string;

    constructor() {
        this.id = 0;
        this.usuario = '';
        this.correo = '';
        this.contrasena = '';
        this.nombre = '';
        this.apellido = '';
    }
}