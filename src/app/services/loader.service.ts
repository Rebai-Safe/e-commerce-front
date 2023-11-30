import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

//https://blog.bitsrc.io/how-to-implement-a-global-loader-in-angular-df111a2c43d9
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private apiCount = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor() { }

  showLoader() {
    if (this.apiCount === 0) {
      this.isLoadingSubject.next(true);
    }
    this.apiCount++;
  }

  hideLoader() {
    this.apiCount--;
    if (this.apiCount === 0) {
      this.isLoadingSubject.next(false);
    }
  }
}
