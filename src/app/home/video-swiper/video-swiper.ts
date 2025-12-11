import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '@share/module/shared.module';

@Component({
  selector: 'app-video-swiper',
  imports: [SharedModule],
  templateUrl: './video-swiper.html',
  styleUrl: './video-swiper.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VideoSwiper {
  showDialog = false;
  currentVideo: string | null = null;
  @ViewChild('swiperEl') swiperEl!: ElementRef;

  openVideo(video: string) {
    this.currentVideo = video;
    this.showDialog = true;
  }

  closeVideo() {
    this.showDialog = false;
    this.currentVideo = null;
  
    // گرفتن المنت swiper-container
    const swiperContainer = this.swiperEl.nativeElement as HTMLElement;
  
    // اضافه کردن اتریبیوت speed
    swiperContainer.setAttribute('speed', '8000');
  
    // اطمینان از اینکه تغییر اعمال میشه
    if ((swiperContainer as any).swiper) {
      (swiperContainer as any).swiper.params.speed = 8000;
      (swiperContainer as any).swiper.update();
    }
  }
}
