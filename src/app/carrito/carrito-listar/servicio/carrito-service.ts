import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoKey = 'carrito';

  constructor() {}

  agregar(producto: any) {
    const carrito = this.obtener();
    carrito.push(producto);
    localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
  }

  obtener(): any[] {
    const data = localStorage.getItem(this.carritoKey);
    return data ? JSON.parse(data) : [];
  }

  vaciar() {
    localStorage.removeItem(this.carritoKey);
  }
}
