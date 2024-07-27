import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venta } from '../../../../models/venta';
import { DetalleVenta } from '../../../../models/detalle-venta';

@Component({
  selector: 'app-modal-detalle-venta',
  templateUrl: './modal-detalle-venta.component.html',
  styleUrl: './modal-detalle-venta.component.css'
})
export class ModalDetalleVentaComponent implements OnInit {
fechaRegistro:string = "";
numeroDocumento: string = "";
tipoPago: string = "";
total: string = "";
detalleVenta: DetalleVenta[] = [];
columnasTabla: string[]=["producto", "cantidad", "precio", "total"];

  constructor(@Inject(MAT_DIALOG_DATA) public _datosVenta: Venta){
    this.fechaRegistro = _datosVenta.fechaRegistro!;
    this.numeroDocumento = _datosVenta.numeroDocumento!;
    this.tipoPago = _datosVenta.tipoPago;
    this.total = _datosVenta.totalTexto;
    this.detalleVenta = _datosVenta.detalleVenta;
  }

  ngOnInit(): void {
  }

}
