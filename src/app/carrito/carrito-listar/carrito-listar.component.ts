import { Component, OnInit } from '@angular/core';
import { CarritoService } from './servicio/carrito-service'; 
import { CommonModule } from '@angular/common';

@Component({
  standalone: true, 
  imports: [CommonModule],
  selector: 'app-carrito-listar',
  templateUrl: './carrito-listar.component.html',
})
export class CarritoListarComponent implements OnInit {
  carrito: any[] = [];

  constructor(private carritoService: CarritoService) {}

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
}
