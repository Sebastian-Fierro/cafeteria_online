import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) {}

  createProduct(product: any) {
    return this.http.post('http://localhost:3000/api/products', product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(`http://localhost:3000/api/products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/api/products/${id}`);
  }
}
