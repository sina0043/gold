import { Component } from '@angular/core';
import { SharedModule } from '@share/module/shared.module';

@Component({
  selector: 'app-card-loading',
  imports: [
    SharedModule
  ],
  templateUrl: './card-loading.html',
  styleUrl: './card-loading.scss'
})
export class CardLoading {
}
