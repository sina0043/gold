import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '@share/module/shared.module';
import { DeviceService } from '@share/service/device-service';
import { PlatformService } from '@share/service/platform.service';

@Component({
  selector: 'app-time-line',
  imports: [
    SharedModule,
  ],
  templateUrl: './time-line.html',
  styleUrl: './time-line.scss'
})
export class TimeLine implements OnInit {
  private platformService = inject(PlatformService);
  private deviceService = inject(DeviceService);

  events?: any[];
  alignMode: 'alternate' | 'right' = 'alternate';

  ngOnInit(): void {
    if (this.platformService.isBrowser()) {
      if (this.deviceService.isMobile()) {
        this.alignMode = 'right';
      } else {
        this.alignMode = 'alternate';
      }
      
      this.events = [
        {
          status: 'انتخاب محصول',
          date: '1403/12/01',
          icon: 'pi pi-bookmark-fill',
          color: '#0ea5e9',
          image: 'bamboo-watch.jpg',
          description: 'این اولین مرحله از پروژه است که در آن تحلیل و برنامه‌ریزی انجام می‌شود. در این فاز اهداف کلی مشخص شده و تیم با جمع‌آوری نیازمندی‌ها و گفتگو با ذی‌نفعان مسیر آینده پروژه را ترسیم می‌کند.',
          directiion: 'right',
          animation: (this.deviceService.isMobile() || this.deviceService.isTablet())  ? 'fade-in-10 slide-in-from-r-8' : 'fade-in-10 slide-in-from-r-8' 
        },
        {
          status: 'افزودن به سبد خرید',
          date: '1403/12/10',
          icon: 'pi pi-shopping-cart',
          color: '#22c55e',
          image: 'blue-band.jpg',
          description: 'در این مرحله تیم طراحی ظاهر و تجربه کاربری اپلیکیشن را آماده می‌کند. علاوه بر طراحی صفحات اصلی، رنگ‌ها، فونت‌ها و استانداردهای بصری نیز تعیین می‌شود تا کاربر تجربه‌ای جذاب و ساده داشته باشد.',
          directiion: 'left',
          animation: (this.deviceService.isMobile() || this.deviceService.isTablet())  ? 'fade-in-10 slide-in-from-r-8' : 'fade-in-10 slide-in-from-l-8' 
        },
        {
          status: 'نهایی کردن خرید',
          date: '1403/12/20',
          icon: 'pi pi-box',
          color: '#f97316',
          image: 'game-controller.jpg',
          description: 'توسعه‌دهندگان شروع به نوشتن کد و پیاده‌سازی قابلیت‌های اصلی می‌کنند. هر بخش به صورت ماژولار ساخته شده و پس از آن با سایر بخش‌ها ترکیب می‌شود تا یک محصول کامل شکل بگیرد.',
          directiion: 'right',
          animation: (this.deviceService.isMobile() || this.deviceService.isTablet())  ? 'fade-in-10 slide-in-from-r-8' : 'fade-in-10 slide-in-from-r-8' 
        },
        {
          status: 'درگاه پرداخت',
          date: '1403/12/30',
          icon: 'pi pi-check',
          color: '#ef4444',
          image: 'blue-t-shirt.jpg',
          description: 'در این مرحله تست نهایی انجام می‌شود و محصول برای تحویل آماده است. اشکالات احتمالی شناسایی و برطرف شده و در نهایت نسخه پایدار در اختیار کارفرما یا کاربران قرار می‌گیرد.',
          directiion: 'left',
          animation: (this.deviceService.isMobile() || this.deviceService.isTablet())  ? 'fade-in-10 slide-in-from-r-8' : 'fade-in-10 slide-in-from-l-8' 
        }
      ];     
    }
  }
}
