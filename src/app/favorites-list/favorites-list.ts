import { Component, inject } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SharedModule } from '@share/module/shared.module';
import { Card } from '@share/component/card/card';
import { CardLoading } from '@share/component/card/card-loading/card-loading';
import { Breadcrumb } from '@share/component/breadcrumb/breadcrumb';
import { ShareDataService } from '@share/service/share-data.service';
import { WishlistService } from '@share/service/wish-list.service';

@Component({
  selector: 'app-favorites-list',
  imports: [
    SharedModule,
    Card,
    CardLoading,
    Breadcrumb
  ],
  templateUrl: './favorites-list.html',
  styleUrl: './favorites-list.scss'
})
export class FavoritesList {
  private wishlistService = inject(WishlistService);
  private messageService = inject(MessageService);
  private shareDataService = inject(ShareDataService);

  BreadcrumbItems: MenuItem[] | undefined;

  layout: 'grid' | 'list' = 'grid';

  // لیست علاقه‌مندی‌ها
  allProducts: any[] = [];

  isLoaded: boolean = false;

  // Pagination
  currentFirst: number = 0;
  rowsPerPage: number = 8;
  totalRecords: number = 0;

  ngOnInit() {
    setTimeout(() => (this.isLoaded = true), 1000);

    this.BreadcrumbItems = [{ label: 'علاقه مندی ها' }];

    // بارگذاری اولیه لیست علاقه‌مندی‌ها
    this.loadWishlist();

    // وقتی wishlist تغییر کرد، دوباره بارگذاری کن
    this.shareDataService.wishlistChanged$.subscribe(() => {
      this.loadWishlist();
    });
  }

  // بارگذاری wishlist از سرویس
  loadWishlist() {
    this.allProducts = this.wishlistService.getList();
    this.totalRecords = this.allProducts.length;
  }

  // Pagination
  onPageChange(event: any) {
    this.currentFirst = event.first ?? 0;
    this.rowsPerPage = event.rows ?? 8;

    this.isLoaded = false;
    setTimeout(() => (this.isLoaded = true), 500);
  }

  // مدیریت سبد خرید
  handleAddToShoppingList(event: { product: any; inShoppinglist: boolean }) {
    if (event.inShoppinglist) {
      this.messageService.add({
        severity: 'success',
        detail: 'محصول به سبد خرید اضافه شد'
      });
    } else {
      this.messageService.add({
        severity: 'info',
        detail: 'محصول از سبد خرید حذف شد'
      });
    }
  }

  // مدیریت علاقه‌مندی‌ها
  handleAddToWishlist(event: { product: any; inWishlist: boolean }) {
    if (event.inWishlist) {
      this.messageService.add({
        severity: 'success',
        detail: 'محصول به لیست علاقه‌مندی‌ها اضافه شد'
      });
    } else {
      this.messageService.add({
        severity: 'info',
        detail: 'محصول از لیست علاقه‌مندی‌ها حذف شد'
      });
    }

    // بعد از تغییر دوباره لیست را بارگذاری کن تا UI به‌روز شود
    this.loadWishlist();
  }
}