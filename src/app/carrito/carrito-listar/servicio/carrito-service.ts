import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoKey = 'carrito';

  constructor() {}

  agregar(producto: any) {
    const carrito = this.obtener();
    const existente = carrito.find(item => item.id === producto.id);
    const cantidadAAgregar = producto.cantidad ?? 1;

    if (existente) {
      existente.cantidad = (existente.cantidad || 1) + cantidadAAgregar;
    } else {
      carrito.push({ ...producto, cantidad: cantidadAAgregar });
    }

    localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
  }

  obtener(): any[] {
    const data = localStorage.getItem(this.carritoKey);
    return data ? JSON.parse(data) : [];
  }

  actualizar(carrito: any[]) {
  localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
}

  vaciar() {
    localStorage.removeItem(this.carritoKey);
  }
}
