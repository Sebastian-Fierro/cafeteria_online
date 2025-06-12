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

  if (existente) {
    existente.cantidad = (existente.cantidad || 1) + 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

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
