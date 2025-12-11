import { Component } from '@angular/core';
import { SharedModule } from '@share/module/shared.module';

@Component({
  selector: 'app-footer',
  imports: [SharedModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  value3: string | undefined;
}
