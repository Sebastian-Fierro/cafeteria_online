import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.css'
})
export class SeguimientoComponent {
  codigoPedido: string = '';
  ordenEncontrada: any = null;

  estados = [
    { valor: 'PENDING', etiqueta: 'Pendiente' },
    { valor: 'IN_PREPARATION', etiqueta: 'En preparación' },
    { valor: 'READY_FOR_PICKUP', etiqueta: 'Preparado' },
    { valor: 'COMPLETED', etiqueta: 'Completado' },
  ];

  constructor(private http: HttpClient) {}

  buscarPedido() {
    if (!this.codigoPedido.trim()) {
      alert('Por favor ingresa un código de pedido');
      return;
    }

    this.http.get(`http://localhost:3000/api/orders/${this.codigoPedido}`).subscribe({
      next: (data) => this.ordenEncontrada = data,
      error: () => {
        this.ordenEncontrada = null;
        alert('No se encontró el pedido');
      }
    });
  }

  esEstadoCompletado(estado: any): boolean {
    const ordenIndex = this.estados.findIndex(e => e.valor === this.ordenEncontrada.status);
    const estadoIndex = this.estados.findIndex(e => e.valor === estado.valor);
    return estadoIndex < ordenIndex;
  }
}
