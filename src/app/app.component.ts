import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ProductListComponent } from "./product/product-list/product-list.component";
import { ProductService } from './product/product-list.service';
import { Router } from '@angular/router';
import { Product } from './product';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from "./welcome/welcome.component";
import { CategorySidebarComponent } from './category/category-sidebar/category-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, FormsModule, RouterModule, WelcomeComponent, CategorySidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedCategory: number | null = null;
  title = 'cafeteria_online';
  _listFilter: string = ' ';

  constructor(private productService: ProductService, private router:Router){}





  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string) {
     this._listFilter = value;
   this.productService.filteredProducts=
       this.listFilter ? this.performFilter(this.listFilter):
       this.productService.products;
  }
  performFilter(filterBy: string): Product[]{
    filterBy = filterBy.toLowerCase();
    return this.productService.products.filter((products: Product)=> products.name.toLowerCase().indexOf(filterBy)!==-1)
  }

  onCategorySelected(categoryId: number | null): void {
  if (categoryId === null) {
    this.productService.filteredProducts = this.productService.products;
  } else {
    this.productService.filteredProducts = this.productService.products.filter(
      (p) => p.categoryId === categoryId
    );
  }
}

  
  ngOnInit(): void {
  this.productService.getProducts().subscribe(
    (res: any) => {
      this.productService.products = res;
      this.productService.filteredProducts = res;
      console.log(this.productService.products);
    },
    err => console.log(err)
  );
  } 
}
