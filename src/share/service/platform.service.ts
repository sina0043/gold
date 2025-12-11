import { inject, Injectable } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  private platformId = inject(PLATFORM_ID);

  /** آیا در مرورگر هستیم؟ */
  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /** آیا در سرور هستیم؟ */
  isServer(): boolean {
    return isPlatformServer(this.platformId);
  }
}