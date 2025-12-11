import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PlatformService } from '@share/service/platform.service';
import moment from 'moment';

@Component({
  selector: 'app-oclock',
  imports: [],
  templateUrl: './oclock.html',
  styleUrl: './oclock.scss'
})
export class Oclock implements OnInit, OnDestroy {
  private platformService = inject(PlatformService);
  
  hours = '';
  minutes = '';
  seconds = '';
  day = '';
  frameId: number | null = null;

  ngOnInit(): void {
    if (this.platformService.isBrowser()) {
      this.updateTime();
    }
  }

  ngOnDestroy(): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  }

  updateTime = () => {
    const now = moment();
    const jsDay = now.day(); // 0 = یکشنبه، 6 = شنبه
    const persianWeekDays = [
      'یکشنبه',
      'دوشنبه',
      'سه‌شنبه',
      'چهارشنبه',
      'پنجشنبه',
      'جمعه',
      'شنبه'
    ];

    this.day = persianWeekDays[jsDay];
    this.hours = now.format('HH');
    this.minutes = now.format('mm');
    this.seconds = now.format('ss');
    this.frameId = requestAnimationFrame(this.updateTime);
  };
}
