import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalAddService } from '../modal-add.service';

@Component({
  selector: 'app-modal-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-add.component.html',
  styleUrl: './modal-add.component.css',
})
export class ModalAddComponent {

  constructor(public modalAddService: ModalAddService) {}
  
  ocultarModalAdd(): void {
    this.modalAddService.ocultarModalAdd();
  }
}
