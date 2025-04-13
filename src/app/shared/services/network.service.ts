import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  isOnline = signal(navigator.onLine);

  setOnlineState(state: boolean) {
    this.isOnline.set(state);
  }
}
