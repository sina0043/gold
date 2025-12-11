import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '@share/module/shared.module';
import { PlatformService } from '@share/service/platform.service';
import { ShareDataService } from '@share/service/share-data.service';

@Component({
  selector: 'app-chart',
  imports: [SharedModule],
  templateUrl: './chart.html',
  styleUrl: './chart.scss'
})
export class Chart implements OnInit {
  private platformService = inject(PlatformService);
  private shareDataService= inject(ShareDataService);

  data: any;
  options: any;

  ngOnInit() {
    this.initChart();

    this.shareDataService.changeThemeColor$.subscribe(() => {
      this.initChart();
    });
  }

  initChart() {
    if (this.platformService.isBrowser()) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      // خواندن رنگ طلایی از CSS
      const baseGold = documentStyle.getPropertyValue('--base-gold-color').trim();

      // تبدیل hex → rgba
      const hexToRgba = (hex: string, alpha: number) => {
        const sanitized = hex.replace('#', '');
        const bigint = parseInt(sanitized, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };

      this.data = {
        labels: ['30','29','28','27','26','25','24','23','22','21',
          '20','19','18','17','16','15','14','13','12','11',
          '10','9','8','7','6','5','4','3','2','1'],
        datasets: [
          {
            label: 'قیمت',
            data: [
              7390226, 7465209, 7502985, 7524936, 7635262, 7788196, 7734541,
              7705065, 7730904, 7778902, 7874628, 8161210, 8352730, 8442700,
              8671258, 8815350, 8901667, 8708198, 8660447, 8562472, 8520178,
              8636331, 8711484, 8746365, 8726545, 8610840, 8596242, 8610899,
              8453151, 8579888
            ],
            fill: true,
            borderColor: baseGold,
            tension: 0.4,
            backgroundColor: hexToRgba(baseGold, 0.2) // همون رنگ ولی شفاف‌تر
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              callback: (value: any, index: number) => {
                // مقدار درست لیبل رو از this.data.labels بگیر
                const label = this.data.labels[index];
          
                // اگر عدد بود، فارسی کن
                if (!isNaN(Number(label))) {
                  return Number(label).toLocaleString('fa-IR');
                }
          
                // اگر متن بود، همون رو نشون بده
                return label;
              }
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary,
              callback: (value: any) => {
                return Number(value).toLocaleString('fa-IR'); // اعداد فارسی
              }
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };
    }
  }
}