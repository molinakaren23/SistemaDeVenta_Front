export interface Usuario {
    idUsuario: number;
    nombreCompleto?: string;
    correo?: string;
    idRol?: number;
    descripcionRol: string,
    clave?: string;
    esActivo?: number;
}
