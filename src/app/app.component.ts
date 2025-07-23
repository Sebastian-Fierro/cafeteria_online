import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductService } from './product/product-list.service';
import { Router } from '@angular/router';
import { Product } from './product';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { ModalAddComponent } from './services/modal-add/modal-add.component';
import { CategorySidebarComponent } from './category/category-sidebar/category-sidebar.component';
import { AdminModeService } from './shared/admin-mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ProductListComponent,
    FormsModule,
    RouterModule,
    WelcomeComponent,
    ModalAddComponent,
    CategorySidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  selectedCategory: number | null = null;
  title = 'cafeteria_online';
  _listFilter: string = ' ';

  isAdmin: boolean = false; // Para logica de login

  constructor(
    private productService: ProductService,
    private router: Router,
    private adminService: AdminModeService
  ) {}

  onCategorySelected(categoryId: number | null): void {
    this.isAdmin = this.adminService.getAdminMode();

    if (categoryId === null) {
      this.productService.filteredProducts = this.productService.products;
    } else {
      this.productService.filteredProducts =
        this.productService.products.filter((p) => p.categoryId === categoryId);
    }
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.productService.products = res;
        this.productService.filteredProducts = res;
        console.log(this.productService.products);
      },
      (err) => console.log(err)
    );
  }

  toggleAdminMode() {
    this.adminService.setAdminMode(this.isAdmin);
  }
}
