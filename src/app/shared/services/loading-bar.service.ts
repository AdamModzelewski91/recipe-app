import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingBarService {
  isLoading = signal(false);

  loadingOn() {
    this.isLoading.set(true);
  }

  loadingOff() {
    this.isLoading.set(false);
  }
}
