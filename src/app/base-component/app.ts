import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { SharedModule } from '@share/module/shared.module';
import { BackgroundAnimation } from '@share/component/background-animation/background-animation';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    Header, 
    Footer,
    BackgroundAnimation,
    SharedModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [
    MessageService
  ]
})
export class App {

}
