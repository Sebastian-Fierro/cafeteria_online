import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component } from '@angular/core';
import { ModalAddService } from '../modal-add.service';
import { Category } from '../../category';
import { ProductServiceService } from '../product-service.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-modal-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-add.component.html',
  styleUrl: './modal-add.component.css',
})
export class ModalAddComponent {
  productForm: FormGroup;
  categories: Category[] = [];
  isEditing: boolean = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductServiceService,
    private categoryService: CategoryService,
    public modalAddService: ModalAddService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required], // <- Agregado required
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(1)]],
      categoryId: ['', Validators.required],
      image: [''],
      isActive: [true],
    });
    this.loadCategories();

    if (this.modalAddService.isEditMode && this.modalAddService.productToEdit) {
    this.loadProductToEdit(this.modalAddService.productToEdit);
  }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        console.log('Categorías recibidas:', categories); // 👈 Verifica esto
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      },
    });
  }

  loadProductToEdit(product: any): void {
  this.isEditing = true;
  this.productId = product.id;

  this.productForm.patchValue({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    categoryId: product.categoryId,
    image: product.image,
    isActive: product.isActive,
  });

  this.modalAddService.mostrarModalAdd();
}

  onSubmit(): void {
  if (this.productForm.invalid) return;

  const formValue = this.productForm.value;

  if (this.isEditing && this.productId !== null) {
    // Modo editar
    this.productService.updateProduct(this.productId, formValue).subscribe(
      () => {
        this.modalAddService.ocultarModalAdd();
        window.location.reload(); // o emite un evento si prefieres
      },
      (error) => console.error('Error actualizando producto', error)
    );
  } else {
    // Modo crear
    this.productService.createProduct(formValue).subscribe(
      () => {
        this.modalAddService.ocultarModalAdd();
        window.location.reload();
      },
      (error) => console.error('Error creando producto', error)
    );
  }
}

  ocultarModalAdd(): void {
    this.modalAddService.ocultarModalAdd();
  }
}
