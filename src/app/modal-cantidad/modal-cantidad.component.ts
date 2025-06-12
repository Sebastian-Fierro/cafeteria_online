import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-cantidad',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-cantidad.component.html',
  styleUrl: './modal-cantidad.component.css'
})
export class ModalCantidadComponent {
  @Input() producto: any;
  @Output() cerrar = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<number>();

  cantidad: number = 1;

  aceptar() {
    if (this.cantidad > 0) {
      this.confirmar.emit(this.cantidad);
    }
  }

  cancelar() {
    this.cerrar.emit();
  }
}