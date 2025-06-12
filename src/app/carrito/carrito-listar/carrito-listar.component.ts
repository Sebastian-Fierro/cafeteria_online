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
  total: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
  this.carrito = this.carritoService.obtener();
  console.log('Carrito cargado:', this.carrito); 
  this.total = this.carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);
  }

  vaciarCarrito() {
  this.carritoService.vaciar();
  this.carrito = [];
  this.total = 0;
  }
  
}