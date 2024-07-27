import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { VentaService } from '../../../../services/venta.service';
import { UtilidadService } from '../../../../reutilizable/utilidad.service';
import { Reporte } from '../../../../models/reporte';

export const MY_DATA_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS }
  ]
})
export class ReporteComponent implements OnInit, AfterViewInit {

  formularioFiltro: FormGroup;
  listaVentasReporte: Reporte[] = [];
  columnasTabla: string[] = ['fechaRegistro', 'numeroVenta', 'tipoPago', 'total', 'producto', 'cantidad', 'precio', 'totalProducto'];
  dataVentaReporte = new MatTableDataSource(this.listaVentasReporte);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private _ventaServicio: VentaService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioFiltro = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataVentaReporte.paginator = this.paginacionTabla;
  }

  buscarVentas() {
    const _fechaInicio = moment(this.formularioFiltro.value.fechaInicio).format("DD/MM/YYYY");
    const _fechaFin = moment(this.formularioFiltro.value.fechaFin).format("DD/MM/YYYY");

    if (_fechaInicio === 'Invalid date' || _fechaFin === 'Invalid date') {
      this._utilidadServicio.mostrarAlerta("Debe ingresar ambas fechas", "");
      return;
    }

    this._ventaServicio.reporte(_fechaInicio, _fechaFin).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        if (data.status) {
          this.listaVentasReporte = data.value;
          this.dataVentaReporte.data = data.value; 
          
        }else{
          this.listaVentasReporte = [];
          this.dataVentaReporte.data = [];
          this._utilidadServicio.mostrarAlerta("No se encontraron datos", "");
        }this.dataVentaReporte.paginator = this.paginacionTabla;
      },
      error :(e)=>{}
    })
  }

  exportarExcel(){
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.listaVentasReporte);


    XLSX.utils.book_append_sheet(wb,ws,"Reporte");
    XLSX.writeFile(wb,"Reporte Venta.xlsx");
  }

}
