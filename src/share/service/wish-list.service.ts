import { inject, Injectable } from '@angular/core';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private platformService = inject(PlatformService);
  private storageKey = 'wishlist';

  getList(): any[] {
    if (this.platformService.isServer()) return [];
    const list = localStorage.getItem(this.storageKey);
    return list ? JSON.parse(list) : [];
  }

  add(product: any): void {
    if (this.platformService.isServer()) return;
    const list = this.getList();
    const existingItem = list.find(item => item.id === product.id);

    if (!existingItem) {
      list.push(product);
      localStorage.setItem(this.storageKey, JSON.stringify(list));
    }
  }

  remove(productId: string): void {
    if (this.platformService.isServer()) return;
    let list = this.getList().filter(item => item.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  isInList(productId: string): boolean {
    if (this.platformService.isServer()) return false;
    return this.getList().some(item => item.id === productId);
  }
}
