import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product-list.service';
import { CarritoService } from '../../carrito/carrito-listar/servicio/carrito-service';
import { Product } from '../../product';
import { ModalAddComponent } from '../../services/modal-add/modal-add.component';
import { ModalAddService } from '../../services/modal-add.service';
import { FormsModule } from '@angular/forms';
import { ModalCantidadComponent } from '../../modal-cantidad/modal-cantidad.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ModalAddComponent,
    FormsModule,
    ModalCantidadComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  _listFilter: string = '';

  @ViewChild(ModalAddComponent) modalAddComponent!: ModalAddComponent;

  productoSeleccionado: any = null;
  mostrarModal: boolean = false;

  isAdmin: boolean = false; // Para logica de login

  carrito: any[] = [];
  total: number = 0;

  constructor(
    public carritoService: CarritoService,
    public productService: ProductService,
    public modalAddService: ModalAddService
  ) {}

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/sin-imagen.png';
  }
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.productService.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.productService.products;
  }
  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLowerCase();
    return this.productService.products.filter(
      (products: Product) =>
        products.name.toLowerCase().indexOf(filterBy) !== -1
    );
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error al cargar productos:', err),
    });
  }

  agregar(producto: any) {
    this.carritoService.agregar(producto);
    alert(`${producto.name} agregado al carrito`);
  }

  editarProducto(product: any) {
    this.modalAddComponent.loadProductToEdit(product);
  }

  eliminarProducto(product: any) {
    if (
      confirm(
        `¿Estás seguro de eliminar el producto "${product.name}"?`
      )
    ) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.products = this.products.filter((p) => p.id !== product.id);
          this.productService.filteredProducts = this.products;
          alert(`Producto "${product.name}" eliminado correctamente.`);
        },
        error: (err) => {
          console.error('Error al eliminar producto:', err);
          alert('Hubo un error al eliminar el producto.');
        },
      });
    }
  }

  abrirModalAdd() {
    this.modalAddComponent.resetModal();
    this.modalAddService.mostrarModalAdd();
  }

  abrirModal(product: any) {
    this.productoSeleccionado = product;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.productoSeleccionado = null;
  }

  confirmarCantidad(cantidad: number) {
    this.carritoService.agregar({ ...this.productoSeleccionado, cantidad });
    this.cerrarModal();
    alert(`${this.productoSeleccionado.name} x${cantidad} agregado al carrito`);
  }
}
