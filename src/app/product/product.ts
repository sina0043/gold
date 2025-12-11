import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '@share/component/card/card';
import { ProductService } from './productservice';
import { SharedModule } from '@share/module/shared.module';
import { CardLoading } from '@share/component/card/card-loading/card-loading';
import { Breadcrumb } from '@share/component/breadcrumb/breadcrumb';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  imports: [
    SharedModule,
    Card,
    CardLoading,
    Breadcrumb
  ],
  templateUrl: './product.html',
  styleUrl: './product.scss', 
})
export class Product implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  
  BreadcrumbItems: MenuItem[] | undefined;
  
  category!: string;
  subcategory!: string;
  slug!: string;
  
  layout: 'grid' | 'list' = 'grid';
  
  // لیست کل محصولات
  allProducts: any[] = [];
  
  // محصولات صفحه جاری
  pagedProducts: any[] = [];
  
  isLoaded: boolean = false;
  
  // Pagination variables
  currentFirst: number = 0;   // اندیس اولین آیتم
  rowsPerPage: number = 8;    // تعداد در هر صفحه
  totalProducts: number = 0;  // تعداد کل محصولات
  totalRecords: number = 0;
  
  ngOnInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 1000);
  
    this.route.paramMap.subscribe(params => {
      this.currentFirst = 0;
      this.isLoaded = false;
  
      setTimeout(() => {
        this.isLoaded = true;
      }, 1000);
  
      this.category = params.get('category')!;
      this.subcategory = params.get('subcategory')!;
      this.slug = params.get('slug')!;
  
      this.loadData();
    });
  
    this.productService.getProducts().then((data) => {
      this.allProducts = data;
      this.totalRecords = data.length;
      this.totalProducts = this.allProducts.length;
      this.updatePagedProducts();
    });
  }
  
  onPageChange(event: any) {
    this.currentFirst = event.first ?? 0;
    this.rowsPerPage = event.rows ?? 8;
  
    console.log("📌 صفحه تغییر کرد:");
    console.log("➡️ اولین آیتم:", this.currentFirst);
    console.log("➡️ تعداد آیتم در هر صفحه:", this.rowsPerPage);
  
    this.isLoaded = false;
    setTimeout(() => {
      this.isLoaded = true;
      this.updatePagedProducts();
    }, 500);
  }
  
  updatePagedProducts() {
    this.pagedProducts = this.allProducts.slice(this.currentFirst, this.currentFirst + this.rowsPerPage);
  
    console.log("📦 محصولات صفحه جاری:", this.pagedProducts);
  }

  loadData() {
    if (this.category === 'gold' && this.subcategory === 'jewelry') {
      if (this.slug === 'necklaces') {
        this.BreadcrumbItems = [
          { label: 'محصولات' },
          { label: 'طلای زینتی' },
          { label: 'گردنبند طلا' },
        ];
      } else if (this.slug === 'bracelets') {
        this.BreadcrumbItems = [
          { label: 'محصولات' },
          { label: 'طلای زینتی' },
          { label: 'دستبند طلا' },
        ];
      } else if (this.slug === 'earrings') {
        this.BreadcrumbItems = [
          { label: 'محصولات' },
          { label: 'طلای زینتی' },
          { label: 'گوشواره طلا' },
        ];
      } else if (this.slug === 'rings') {
        this.BreadcrumbItems = [
          { label: 'محصولات' },
          { label: 'طلای زینتی' },
          { label: 'انگشتر طلا' },
        ];
      } else if (this.slug === 'anklets') {
        this.BreadcrumbItems = [
          { label: 'محصولات' },
          { label: 'طلای زینتی' },
          { label: 'پابند طلا' },
        ];
      } else if (this.slug === 'sets') {
        this.BreadcrumbItems = [
          { label: 'محصولات' },
          { label: 'طلای زینتی' },
          { label: 'سرویس کامل طلا' },
        ];
      } else if (this.slug === 'wedding-rings') {
        this.BreadcrumbItems = [
          { label: 'محصولات' },
          { label: 'طلای زینتی' },
          { label: 'حلقه ازدواج' },
        ];
      } else if (this.slug === 'chains') {
        this.BreadcrumbItems = [
          { label: 'محصولات' },
          { label: 'طلای زینتی' },
          { label: 'زنجیر طلا' },
        ];
      }
    }
    else if (this.category === 'gold' && this.subcategory === 'melted') {
      if (this.slug === '2-5g') {
        this.BreadcrumbItems = [
          { label: 'محصولات' },
          { label: 'طلای آب شده' },
          { label: 'پلاک 2.5 گرمی' },
        ];
      } else if (this.slug === '5g') {
        this.BreadcrumbItems = [
          { label: 'محصولات' },
          { label: 'طلای آب شده' },
          { label: 'پلاک 5 گرمی' },
        ];
      } else if (this.slug === '10g') {
        this.BreadcrumbItems = [
          { label: 'محصولات' },
          { label: 'طلای آب شده' },
          { label: 'پلاک 10 گرمی' },
        ];
      }
    }
    else if (this.category === 'silver' && this.subcategory === 'bars') {
      if (this.slug === '500g') {
        this.BreadcrumbItems = [
          { label: 'محصولات' },
          { label: 'شمش نقره' },
          { label: '500 گرمی' },
        ];
      } else if (this.slug === '1000g') {
        this.BreadcrumbItems = [
          { label: 'محصولات' },
          { label: 'شمش نقره' },
          { label: '1000 گرمی' },
        ];
      }
    }
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
