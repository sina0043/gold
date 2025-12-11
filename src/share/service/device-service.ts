import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private get width(): number {
    return window.innerWidth;
  }

  isMobile(): boolean {
    return this.width <= 576;
  }

  isTablet(): boolean {
    return this.width > 576 && this.width <= 1200;
  }

  isDesktop(): boolean {
    return this.width > 1200;
  }
}
