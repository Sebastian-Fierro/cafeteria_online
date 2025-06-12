import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalAddService {

  public oculto: string = '';
  private _isEditMode: boolean = false;
  private _productToEdit: any = null;

  constructor() { }

  ocultarModalAdd() {
    this.oculto = '';
    console.log('Modal add ocultado');
  }

  mostrarModalAdd() {
    this.oculto = 'block';
    console.log('Modal add mostrado');
  }

  setEditMode(product: any) {
    this._isEditMode = true;
    this._productToEdit = product;
    this.mostrarModalAdd();
  }

  get isEditMode(): boolean {
    return this._isEditMode;
  }

  get productToEdit(): any {
    return this._productToEdit;
  }
}
