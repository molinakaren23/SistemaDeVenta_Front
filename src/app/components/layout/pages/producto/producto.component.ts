import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../../../../models/producto';
import { ProductoService } from '../../../../services/producto.service';
import { ModalProductoComponent } from '../../modales/modal-producto/modal-producto.component';
import { UtilidadService } from '../../../../reutilizable/utilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, AfterViewInit {
  columnasTabla: string[] = ['nombre', 'categoria', 'stock', 'precio', 'estado', 'acciones'];
  dataListaProductos = new MatTableDataSource<Producto>();

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService) { }

  ngAfterViewInit(): void {
    this.dataListaProductos.paginator = this.paginacionTabla;
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaProductos.data = data.value;
          this.dataListaProductos.paginator = this.paginacionTabla;
        } else {
          this._utilidadServicio.mostrarAlerta("No se encontraron datos", "")
        }
      },
      error: (e) => { }
    });
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProductos.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataListaProductos.paginator) {
      this.dataListaProductos.paginator.firstPage();
    }
  }

  nuevoProducto() {
    this.dialog.open(ModalProductoComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") this.obtenerProductos();
    });
  }

  editarProducto(producto: Producto) {
    this.dialog.open(ModalProductoComponent, {
      disableClose: true,
      data: producto
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") this.obtenerProductos();
    });
  }

  eliminarProducto(producto: Producto) {
    Swal.fire({
      title: '¿Desea eliminar el producto?',
      text: producto.nombre,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No"
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._productoServicio.eliminar(producto.idProducto).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta("El producto fue eliminado", "");
              this.obtenerProductos();
            } else {
              this._utilidadServicio.mostrarAlerta("El producto no fue eliminado", "");
            }
          }, error: (e) => { }
        })
      }
    });
  }
}
