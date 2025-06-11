import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product-list.service'; 
import { CarritoService } from '../../carrito/carrito-listar/servicio/carrito-service';
import { Product } from '../../product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  carrito: any[] = [];
  total: number = 0;

  constructor(
    public carritoService: CarritoService,
    public productService: ProductService
  ) {}

  onImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = 'assets/sin-imagen.png';
}


  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  agregar(producto: any) {
      this.carritoService.agregar(producto);
      alert(`${producto.name} agregado al carrito`);
    }

}
