import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OrderService } from './service/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  ordenes: any[] = [];

  constructor(private orderService: OrderService, private http: HttpClient) {}

  ngOnInit(): void {
    this.orderService.getOrdenes().subscribe({
      next: (data) => this.ordenes = data.sort((a, b) => b.id - a.id),
      error: (err) => console.error('Error al obtener órdenes', err)
    });
  }

  cambiarEstado(orderId: number, nuevoEstado: string) {
  this.http.put(`http://localhost:3000/api/orders/${orderId}/status`, { status: nuevoEstado })
    .subscribe({
      next: () => {
        // Actualiza los datos localmente o volvé a cargar la lista
        const orden = this.ordenes.find(o => o.id === orderId);
        if (orden) orden.status = nuevoEstado;
      },
      error: (err) => {
        console.error('Error al actualizar el estado', err);
        alert('Hubo un error al actualizar el estado del pedido.');
      }
    });
}

}
