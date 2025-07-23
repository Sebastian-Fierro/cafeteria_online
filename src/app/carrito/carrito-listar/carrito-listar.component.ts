import { Component, OnInit } from '@angular/core';
import { CarritoService } from './servicio/carrito-service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrdenService } from '../../services/orden.service';
import { lastValueFrom } from 'rxjs';
import { ProductServiceService } from '../../services/product-service.service';
import { jsPDF } from 'jspdf';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  selector: 'app-carrito-listar',
  templateUrl: './carrito-listar.component.html',
})
export class CarritoListarComponent implements OnInit {
  carrito: any[] = [];

  constructor(
    private carritoService: CarritoService,
    private ordenService: OrdenService,
    private productService: ProductServiceService
  ) {}

  ngOnInit() {
    this.carrito = this.carritoService.obtener();
    console.log('Carrito cargado:', this.carrito);
  }

  incrementar(item: any) {
    item.cantidad++;
    this.carritoService.actualizar(this.carrito);
  }

  decrementar(item: any) {
    if (item.cantidad > 1) {
      item.cantidad--;
      this.carritoService.actualizar(this.carrito);
    }
  }

  eliminar(item: any) {
    this.carrito = this.carrito.filter((i) => i !== item);
    this.carritoService.actualizar(this.carrito);
  }

  vaciarCarrito() {
    this.carritoService.vaciar();
    this.carrito = [];
  }

  getTotal(): number {
    return this.carrito.reduce(
      (acc, item) => acc + item.price * item.cantidad,
      0
    );
  }

  async procesarCompra() {

    if (this.carrito.length === 0) {
    alert('El carrito está vacío. Agrega al menos un producto para continuar con la compra.');
    return;
  }

    const items = this.carrito.map((item) => ({
      productId: item.id,
      quantity: item.cantidad,
      price: item.price,
    }));

    const orden = {
      clientId: 2, // usa el ID real del cliente
      total: this.getTotal(),
      paymentMethod: 'DEBIT_CARD',
      items: items,
    };

    try {
      const respuesta = await lastValueFrom(
        this.ordenService.crearOrden(orden)
      );
      console.log('Orden creada:', respuesta);

      await this.actualizarStockProductos();

      this.generarBoletaPDF();
      this.vaciarCarrito();
    } catch (error) {
      console.error('Error al procesar la compra o actualizar stock:', error);
      alert('Hubo un problema al procesar la compra o actualizar el stock.');
    }
  }

  private async actualizarStockProductos() {
    for (const item of this.carrito) {
      const nuevoStock = item.stock - item.cantidad;
      if (nuevoStock < 0) {
        throw new Error(`Stock insuficiente para producto ${item.name}`);
      }
      const productoActualizado = {
        ...item,
        stock: nuevoStock,
      };

      // Espera la actualización de stock usando lastValueFrom
      await lastValueFrom(
        this.productService.updateProduct(item.id, productoActualizado)
      );
    }
  }

  generarBoletaPDF() {
    const doc = new jsPDF();
    let y = 20;

    // Encabezado
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Boleta de Compra', doc.internal.pageSize.getWidth() / 2, y, {
      align: 'center',
    });
    y += 8;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Cafetería Online', doc.internal.pageSize.getWidth() / 2, y, {
      align: 'center',
    });
    y += 10;

    // Fecha
    doc.setFontSize(11);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, y);
    y += 8;

    // Línea divisoria
    doc.line(20, y, 190, y);
    y += 5;

    // Título tabla
    doc.setFont('helvetica', 'bold');
    doc.text('Producto', 20, y);
    doc.text('Cant.', 100, y);
    doc.text('P. Unit', 130, y);
    doc.text('Subtotal', 160, y);
    y += 7;
    doc.setFont('helvetica', 'normal');

    // Detalles del carrito
    this.carrito.forEach((item) => {
      const subtotal = (item.price * item.cantidad).toFixed(2);
      doc.text(item.name, 20, y);
      doc.text(`${item.cantidad}`, 105, y, { align: 'right' });
      doc.text(`$${item.price.toFixed(2)}`, 135, y, { align: 'right' });
      doc.text(`$${subtotal}`, 180, y, { align: 'right' });
      y += 6;
    });

    // Línea divisoria
    y += 4;
    doc.line(20, y, 190, y);
    y += 6;

    // Total
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`TOTAL: $${this.getTotal().toFixed(2)}`, 160, y, {
      align: 'right',
    });

    // Mensaje final
    y += 20;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(
      'Gracias por tu compra. ¡Te esperamos nuevamente!',
      doc.internal.pageSize.getWidth() / 2,
      y,
      { align: 'center' }
    );

    // Descargar PDF
    doc.save(`boleta_${Date.now()}.pdf`);
  }
}
