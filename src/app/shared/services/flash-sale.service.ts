import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlashSaleService {
  private intervalId: any;
  private timeFlashSale = 30000;

  constructor() {}

  startCountdown(): void {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      if (this.timeFlashSale > 0) {
        this.timeFlashSale--;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  getTime(): number {
    return this.timeFlashSale;
  }

  stopCountdown(): void {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  default(){
    this.intervalId = null
    this.timeFlashSale = 0;
  }
}
