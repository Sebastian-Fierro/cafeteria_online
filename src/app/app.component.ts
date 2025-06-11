import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ProductListComponent } from "./product/product-list/product-list.component";
import { ProductService } from './product/product-list.service';
import { Router } from '@angular/router';
import { Product } from './product';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from "./welcome/welcome.component";
import { CommonModule } from '@angular/common';
import { ModalAddComponent } from './services/modal-add/modal-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductListComponent, FormsModule, RouterModule, WelcomeComponent, ModalAddComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cafeteria_online';
  _listFilter: string = ' ';
  
  isAdmin: boolean = true; // Para logica de login

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
