import { Component, inject, ViewChild } from '@angular/core';
import { SharedModule } from '@share/module/shared.module';
import { MessageService, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from '../../product/productservice';
import { Card } from "@share/component/card/card";

@Component({
  selector: 'app-table',
  imports: [
    SharedModule,
    Card
],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class TableComponent {
  private productService = inject(ProductService);
  private messageService = inject(MessageService);

  @ViewChild('dt') dt!: Table;

  products!: any[];
  selectedProducts!: any[] | null;
  isSorted: boolean | null = null;
  initialValue?: any[];
  visible: boolean = false;
  selectedProduct: any;

  ngOnInit() {
    this.loadDemoData();
  }

  loadDemoData() {
    this.productService.getProducts().then((data: any) => {
      this.products = data;
      this.initialValue = [...data];
    });
  }

  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.products = [...(this.initialValue ?? [])];
      this.dt.reset();
    }
  }

  sortTableData(event: any) {
    event.data.sort((data1: any, data2: any) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  onFilterGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dt.filterGlobal(input.value, 'contains');
  }

  showDialog(product: any) {
    this.selectedProduct = product;
    this.visible = true;
  }

  handleAddToShoppingList(event: { product: any, inShoppinglist: boolean }) {
    if (event.inShoppinglist) {
      this.messageService.add({ severity: 'success', detail: 'محصول به سبد خرید اضافه شد' });
    } else {
      this.messageService.add({ severity: 'info', detail: 'محصول از سبد خرید حذف شد' });
    }
  }
  
  handleAddToWishlist(event: { product: any, inWishlist: boolean }) {
    if (event.inWishlist) {
      this.messageService.add({ severity: 'success', detail: 'محصول به لیست علاقه‌مندی‌ها اضافه شد' });
    } else {
      this.messageService.add({ severity: 'info', detail: 'محصول از لیست علاقه‌مندی‌ها حذف شد' });
    }
  }
}
