import { Component } from '@angular/core';
import { Swiper } from './swiper/swiper';
import { TimeLine } from "./time-line/time-line";
import { Questions } from "./questions/questions";
import { TableComponent } from "./table/table";
import { VideoSwiper } from "./video-swiper/video-swiper";
import { Calculator } from "./calculator/calculator";
import { Chart } from "./chart/chart";
import { SharedModule } from '@share/module/shared.module';

@Component({
  selector: 'app-home',
  imports: [
    Swiper,
    TimeLine,
    Questions,
    TableComponent,
    VideoSwiper,
    Calculator,
    Chart,
    SharedModule
],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {  

}
