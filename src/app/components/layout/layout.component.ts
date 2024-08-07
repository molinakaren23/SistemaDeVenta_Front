import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../models/menu';
import { MenuService } from '../../services/menu.service';
import { UtilidadService } from '../../reutilizable/utilidad.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  listaMenus: Menu[] = [];
  correoUsuario: string = "";
  rolUsuario: string = "";

  constructor(private router:Router,
   private _menuServicio: MenuService,
    private _utilidadServicio: UtilidadService
  ) { }
  ngOnInit(): void {

    const usuario = this._utilidadServicio.obtenerSesionUsuario();

    if(usuario != null){
      this.correoUsuario = usuario.correo;
      this.rolUsuario = usuario.descripcionRol;

      this._menuServicio.lista(usuario.idUsuario).subscribe({
        next: (data)=>{
          if(data.status) this.listaMenus=data.value;
        },
        error:(e)=>{}
      })
    }

  }

  cerrarSesion(){
    this._utilidadServicio.eliminarSesionUsuario();
    this.router.navigate(['login']);
  }

}
