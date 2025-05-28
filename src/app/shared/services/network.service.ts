import { Injectable, NgZone, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private _isOnline = signal(navigator.onLine);
  private _lastOnlineState = navigator.onLine;
  private _triggerChanged = signal(false);

  constructor(private ngZone: NgZone) {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.ngZone.run(() => {
          this._isOnline.set(true);
          this.handleStateChange(true);
        });
      });

      window.addEventListener('offline', () => {
        this.ngZone.run(() => {
          this._isOnline.set(false);
          this.handleStateChange(false);
        });
      });
    }
  }

  private handleStateChange(current: boolean) {
    if (current !== this._lastOnlineState) {
      this._lastOnlineState = current;
      this._triggerChanged.set(true);
      if (current === true) {
        setTimeout(() => this._triggerChanged.set(false), 4000);
      }
    }
  }

  get isOnline() {
    return this._isOnline;
  }

  get connectionChanged() {
    return this._triggerChanged;
  }
}
