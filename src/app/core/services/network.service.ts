import { Injectable, NgZone, signal } from '@angular/core';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private _isOnline = signal(navigator.onLine);
  public _lastOnlineState = navigator.onLine;
  private _triggerChanged = signal(false);

  constructor(private ngZone: NgZone, private appService: AppService) {
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

  refreshAfterOffline() {
    const current = this._isOnline();
    const last = this._lastOnlineState;
    if (!last && current) {
      this._lastOnlineState = current;
      this.appService.startApp();
      alert("Se lanzó el start app")
    } else {
      this._lastOnlineState = current;
    }
  }

  get isOnline() {
    return this._isOnline;
  }

  get connectionChanged() {
    return this._triggerChanged;
  }
}
