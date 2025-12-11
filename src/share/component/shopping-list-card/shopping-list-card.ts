import { Component, Input, inject } from '@angular/core';
import { SharedModule } from '@share/module/shared.module';
import { ShareDataService } from '@share/service/share-data.service';
import { ShoppingListService } from '@share/service/shopping-list.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shopping-list-card',
  imports: [SharedModule],
  templateUrl: './shopping-list-card.html',
  styleUrls: ['./shopping-list-card.scss']
})
export class ShoppingListCard {
  private messageService = inject(MessageService);
  private shareDataService = inject(ShareDataService);
  
  @Input() item: any;

  private shoppingListService = inject(ShoppingListService);

  increaseQuantity() {
    this.item.quantity += 1;
    this.shoppingListService.updateQuantity(this.item.id, this.item.quantity);
    this.shareDataService.shoppingListChanged$.next();
  }
  
  decreaseQuantity() {
    if (this.item.quantity > 1) {
      this.item.quantity -= 1;
      this.shoppingListService.updateQuantity(this.item.id, this.item.quantity);
      this.shareDataService.shoppingListChanged$.next();
    }
  }

  confirmRemove() {
    this.shoppingListService.remove(this.item.id);
    this.messageService.add({ severity: 'info', detail: 'محصول از لیست خرید حذف شد' });
    this.shareDataService.shoppingListChanged$.next();
  }
}
