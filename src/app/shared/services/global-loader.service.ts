import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalLoaderService {
  private _visible = signal(false);
  isVisible = this._visible.asReadonly();

  show() {
    this._visible.set(true);
  }

  hide() {
    this._visible.set(false);
  }
}
