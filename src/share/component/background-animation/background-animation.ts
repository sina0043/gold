import { Component, inject, OnInit } from '@angular/core';
import { PlatformService } from '@share/service/platform.service';
import { ShareDataService } from '@share/service/share-data.service';

@Component({
  selector: 'app-background-animation',
  imports: [],
  templateUrl: './background-animation.html',
  styleUrl: './background-animation.scss'
})
export class BackgroundAnimation implements OnInit {
  private shareDataService= inject(ShareDataService);
  private platformService= inject(PlatformService);

  ngOnInit(): void {
   this.colorChanged();

   this.shareDataService.changeThemeColor$.subscribe(()=>{
    this.colorChanged();
   })
  }

  colorChanged() {
    if (this.platformService.isServer()) return;
    let themeState: any = {};
    try {
      themeState = JSON.parse(localStorage.getItem('themeSwitcherState') || '{}');
    } catch (e) {
      console.error('خطا در خواندن themeSwitcherState از localStorage', e);
    }

    // مقدار پیشفرض
    let goldColor = '#FFD700';

    // تعیین رنگ بر اساس primary
    switch (themeState.primary) {
      case 'yellow': goldColor = '#FFD700'; break;
      case 'amber': goldColor = '#FFBF00'; break;
      case 'lime': goldColor = '#A6CE39'; break;
      case 'green': goldColor = '#22C55E'; break;
      case 'emerald': goldColor = '#10B981'; break;
      case 'teal': goldColor = '#14B8A6'; break;
      case 'cyan': goldColor = '#06B6D4'; break;
      case 'sky': goldColor = '#0EA5E9'; break;
      case 'blue': goldColor = '#3B82F6'; break;
      case 'indigo': goldColor = '#6366F1'; break;
      case 'violet': goldColor = '#8B5CF6'; break;
      case 'purple': goldColor = '#A855F7'; break;
      case 'fuchsia': goldColor = '#D946EF'; break;
      case 'pink': goldColor = '#EC4899'; break;
      case 'rose': goldColor = '#F43F5E'; break;
      case 'orange': goldColor = '#fb923c'; break;
      case 'noir': goldColor = '#ececec'; break;
    }

    // تنظیم CSS variable روی :root
    document.documentElement.style.setProperty('--base-gold-color', goldColor);
  }
}
