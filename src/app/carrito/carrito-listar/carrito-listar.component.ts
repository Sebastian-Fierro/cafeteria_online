import { Component, OnInit } from '@angular/core';
import { CarritoService } from './servicio/carrito-service'; 
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrdenService } from '../../services/orden.service';
import { lastValueFrom } from 'rxjs';
import { ProductServiceService } from '../../services/product-service.service';

@Component({
  standalone: true, 
  imports: [CommonModule, HttpClientModule],
  selector: 'app-carrito-listar',
  templateUrl: './carrito-listar.component.html',
})
export class CarritoListarComponent implements OnInit {
  carrito: any[] = [];

  constructor(private carritoService: CarritoService, private ordenService: OrdenService, private productService: ProductServiceService) {}

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
    this.carrito = this.carrito.filter(i => i !== item);
    this.carritoService.actualizar(this.carrito);
  }

  vaciarCarrito() {
    this.carritoService.vaciar();
    this.carrito = [];
  }


  getTotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);
  }

   async procesarCompra() {
    const items = this.carrito.map(item => ({
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
      const respuesta = await lastValueFrom(this.ordenService.crearOrden(orden));
      console.log('Orden creada:', respuesta);

      await this.actualizarStockProductos();

      alert('Compra realizada y stock actualizado');
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
      await lastValueFrom(this.productService.updateProduct(item.id, productoActualizado));
    }
  }

}
