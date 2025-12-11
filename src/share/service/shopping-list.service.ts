import { inject, Injectable } from '@angular/core';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private platformService= inject(PlatformService);
  private storageKey = 'shopping-list';

  // گرفتن لیست کامل
  getList(): any[] {
    if (this.platformService.isServer()) return []; // روی سرور چیزی برنگرده
    const list = localStorage.getItem(this.storageKey);
    return list ? JSON.parse(list) : [];
  }

  // افزودن محصول
  add(product: any): void {
    if (this.platformService.isServer()) return;
    const list = this.getList();
    const existingItem = list.find(item => item.id === product.id);
    
    if (!existingItem) {
      list.push({ ...product, quantity: 1 }); // افزودن quantity با مقدار 1
    } else {
      // اگر قبلاً بود، می‌خوایم چیزی انجام ندیم یا می‌تونیم تعدادشو افزایش بدیم
      existingItem.quantity += 1;
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }
  
  // آپدیت مقدار quantity
  updateQuantity(productId: string, quantity: number): void {
    if (this.platformService.isServer()) return;
    const list = this.getList();
    const item = list.find(i => i.id === productId);
    if (item) {
      item.quantity = quantity < 1 ? 1 : quantity; // حداقل 1
      localStorage.setItem(this.storageKey, JSON.stringify(list));
    }
  }
  

  // حذف محصول
  remove(productId: string): void {
    if (this.platformService.isServer()) return;
    let list = this.getList();
    list = list.filter(item => item.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  // بررسی اینکه محصول در لیست هست یا نه
  isInList(productId: string): boolean {
    if (this.platformService.isServer()) return false;
    return this.getList().some(item => item.id === productId);
  }
}
