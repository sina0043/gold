import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges, inject } from '@angular/core';
import { SharedModule } from '@share/module/shared.module';
import { ShareDataService } from '@share/service/share-data.service';
import { ShoppingListService } from '@share/service/shopping-list.service';
import { WishlistService } from '@share/service/wish-list.service';

@Component({
  selector: 'app-card',
  imports: [SharedModule],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card implements OnChanges {
  private shoppingListService = inject(ShoppingListService);
  private wishlistService = inject(WishlistService);
  private shareDataService = inject(ShareDataService);

  @Input() product: any;

  inShoppinglist: boolean = false;
  inWishlist: boolean = false;

  @Output() addToShoppinglist = new EventEmitter<{ product: any, inShoppinglist: boolean }>();
  @Output() addToWishlist = new EventEmitter<{ product: any, inWishlist: boolean }>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product && this.product.id) {
      this.inShoppinglist = this.shoppingListService.isInList(this.product.id);
      this.inWishlist = this.wishlistService.isInList(this.product.id);
      // همزمان isInWishList رو هم به محصول اضافه کن
      this.product.isInWishList = this.inWishlist;
    }
  }

  toggleShoppinglist() {
    if (this.inShoppinglist) {
      this.shoppingListService.remove(this.product.id);
    } else {
      const itemToAdd = {
        ...this.product,
        image: this.product.images?.[0]?.id
      };
      this.shoppingListService.add(itemToAdd);
    }

    this.inShoppinglist = !this.inShoppinglist;
    this.addToShoppinglist.emit({
      product: {
        ...this.product,
        image: this.product.images?.[0]?.id
      },
      inShoppinglist: this.inShoppinglist
    });

    this.shareDataService.shoppingListChanged$.next();
  }

  toggleWishlist() {
    if (!this.inWishlist) {
      // اضافه کردن به لیست علاقه مندی ها
      this.wishlistService.add(this.product);
      this.inWishlist = true;
      this.product.isInWishList = true;
    } else {
      // حذف از لیست علاقه مندی ها
      this.wishlistService.remove(this.product.id);
      this.inWishlist = false;
      this.product.isInWishList = false;
    }

    // اطلاع‌رسانی به والد یا سایر کامپوننت‌ها
    this.addToWishlist.emit({ product: this.product, inWishlist: this.inWishlist });
    this.shareDataService.wishlistChanged$.next();
  }
}
