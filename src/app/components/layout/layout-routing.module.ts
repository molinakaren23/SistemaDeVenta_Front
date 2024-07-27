import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { HistorialVentaComponent } from './pages/historial-venta/historial-venta.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { VentaComponent } from './pages/venta/venta.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashBoardComponent },
      { path: 'historial_venta', component: HistorialVentaComponent },
      { path: 'productos', component: ProductoComponent },
      { path: 'reportes', component: ReporteComponent },
      { path: 'usuarios', component: UsuarioComponent },
      { path: 'venta', component: VentaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
