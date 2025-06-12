import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private productService: ProductServiceService,
    private categoryService: CategoryService,
    public modalAddService: ModalAddService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      image: [''],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    // Cargar categorías desde tu servicio
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => this.categories = categories,
      (error) => console.error('Error loading categories', error)
    );
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe(
        (response) => {
          this.modalAddService.ocultarModalAdd();
          // Aquí puedes agregar lógica adicional como recargar la lista de productos
        },
        (error) => console.error('Error creating product', error)
      );
    }
  }
  
  ocultarModalAdd(): void {
    this.modalAddService.ocultarModalAdd();
  }
}
