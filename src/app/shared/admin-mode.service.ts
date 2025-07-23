import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminModeService {

  private adminModeSubject = new BehaviorSubject<boolean>(false);
  adminMode$ = this.adminModeSubject.asObservable();

  setAdminMode(value: boolean) {
    this.adminModeSubject.next(value);
  }

  getAdminMode(): boolean {
    return this.adminModeSubject.value;
  }
}
