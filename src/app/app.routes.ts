import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CarritoListarComponent } from './carrito/carrito-listar/carrito-listar.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/product-list', component: ProductListComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'carrito/carrito-listar', component: CarritoListarComponent}
];
