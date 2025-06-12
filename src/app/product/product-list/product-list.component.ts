import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product-list.service'; 
import { CarritoService } from '../../carrito/carrito-listar/servicio/carrito-service';
import { Product } from '../../product';
import { ModalAddComponent } from "../../services/modal-add/modal-add.component";
import { ModalAddService } from '../../services/modal-add.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ModalAddComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isAdmin: boolean = true; // Para logica de login

  carrito: any[] = [];
  total: number = 0;

  constructor(
    public carritoService: CarritoService,
    public productService: ProductService,
    public modalAddService: ModalAddService,
  ) {}

  onImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = 'assets/sin-imagen.png';
}

  abrirModalAdd(){
    this.modalAddService.mostrarModalAdd();
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
