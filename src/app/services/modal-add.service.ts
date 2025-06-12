import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalAddService {

  public oculto: string = '';

  constructor() { }

  ocultarModalAdd() {
    this.oculto = '';
    console.log('Modal add ocultado');
  }

  mostrarModalAdd() {
    this.oculto = 'block';
    console.log('Modal add mostrado');
  }
}
