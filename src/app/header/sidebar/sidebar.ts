import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '@share/module/shared.module';
import { DeviceService } from '@share/service/device-service';
import { PlatformService } from '@share/service/platform.service';
import { Drawer } from 'primeng/drawer';

@Component({
  selector: 'app-sidebar',
  imports: [
    SharedModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit {
  private platformService = inject(PlatformService);
  private deviceService = inject(DeviceService);

  @ViewChild('drawerRef') drawerRef!: Drawer;
  sidebarItems?: any[] = [];
  visible: boolean = false;

  ngOnInit() {
    if (this.platformService.isBrowser()) {
      if (this.deviceService.isTablet() || this.deviceService.isMobile()) {
        this.sidebarItems = [
          {
            label: 'خانه',
            icon: 'pi pi-home',
            routerLink: '/'
          },
          {
            label: 'خرید طلا',
            icon: 'pi pi-shopping-cart',
            items: [
              {
                label: 'طلای زینتی',
                items: [
                  { label: 'گردنبند طلا', routerLink: '/gold/jewelry/necklaces' },
                  { label: 'دستبند طلا', routerLink: '/gold/jewelry/bracelets' },
                  { label: 'گوشواره طلا', routerLink: '/gold/jewelry/earrings' },
                  { label: 'انگشتر طلا', routerLink: '/gold/jewelry/rings' },
                  { label: 'پابند طلا', routerLink: '/gold/jewelry/anklets' },
                  { label: 'سرویس کامل طلا', routerLink: '/gold/jewelry/sets' },
                  { label: 'حلقه ازدواج', routerLink: '/gold/jewelry/wedding-rings' },
                  { label: 'زنجیر طلا', routerLink: '/gold/jewelry/chains' },
                ],
              },
              {
                label: 'طلای آب شده',
                items: [
                  { label: 'پلاک 2.5 گرمی', routerLink: '/gold/melted/2-5g' },
                  { label: 'پلاک 5 گرمی', routerLink: '/gold/melted/5g' },
                  { label: 'پلاک 10 گرمی', routerLink: '/gold/melted/10g' },
                ],
              },
              {
                label: 'شمش نقره',
                items: [
                  { label: '500 گرمی', routerLink: '/silver/bars/500g' },
                  { label: '1000 گرمی', routerLink: '/silver/bars/1000g' },
                ],
              },
            ],
          },
          {
            label: 'علاقه مندی ها',
            icon: 'pi pi-heart',
            routerLink: '/favorites-list'
          },
          {
            label: 'پیگیری سفارش',
            icon: 'pi pi-box',
            routerLink: '/orders/track'
          },
          {
            label: 'نمایندگی ها',
            icon: 'pi pi-building',
            routerLink: '/representations'
          },
          {
            label: 'تماس با ما',
            icon: 'pi pi-phone',
            routerLink: '/contact-us'
        },
        ]
      }
    }
  }

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  openSidebar() {
    this.visible = true;
  }
}
