import { Component, inject, OnInit } from '@angular/core';
import { Breadcrumb } from '@share/component/breadcrumb/breadcrumb';
import { ShoppingCardLoading } from '@share/component/shopping-list-card/shopping-card-loading/shopping-card-loading';
import { ShoppingListCard } from '@share/component/shopping-list-card/shopping-list-card';
import { SharedModule } from '@share/module/shared.module';
import { ShareDataService } from '@share/service/share-data.service';
import { ShoppingListService } from '@share/service/shopping-list.service';
import { MenuItem } from 'primeng/api';
import { Login } from '../auth/login/login';
import { ShoppingCartSummaryLoading } from '@share/component/shopping-list-card/shopping-cart-summary-loading/shopping-cart-summary-loading';
import { PlatformService } from '@share/service/platform.service';

@Component({
  selector: 'app-shopping-list',
  imports: [
    SharedModule,
    Breadcrumb,
    ShoppingListCard,
    ShoppingCardLoading,
    Login,
    ShoppingCartSummaryLoading
  ],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.scss'
})
export class ShoppingList implements OnInit {
  private shoppingListService = inject(ShoppingListService);
  private shareDataService = inject(ShareDataService);
  private platformService= inject(PlatformService);

  BreadcrumbItems: MenuItem[] | undefined;
  products: any[] = [];
  isLoaded: boolean = false;

  cart: any[] = [];
  totalPrice: number = 0;
  totalItems: number = 0;
  discount: number = 0;
  finalPrice: number = 0;

  ngOnInit() {
    this.BreadcrumbItems = [{ label: 'لیست خرید' }];
    setTimeout(() => {
      this.isLoaded = true;
    }, 1000);

    this.loadProducts();
    this.updateCartSummary();

    this.shareDataService.shoppingListChanged$.subscribe(() => {
      this.loadProducts();
      this.updateCartSummary();
    });
  }

  loadProducts() {
    this.products = this.shoppingListService.getList();
  }

  updateCartSummary() {
    if (this.platformService.isServer()) return;
    const data = localStorage.getItem('shopping-list');
    if (data) {
      this.cart = JSON.parse(data);
  
      // تعداد کل آیتم‌ها (با در نظر گرفتن quantity)
      this.totalItems = this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  
      // جمع قیمت‌ها (با در نظر گرفتن quantity)
      this.totalPrice = this.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  
      // تخفیف = ۱٪ مجموع قیمت‌ها
      this.discount = Math.floor(this.totalPrice * 0.01);
  
      // جمع نهایی بعد از تخفیف
      this.finalPrice = this.totalPrice - this.discount;
    }
  }  
}
