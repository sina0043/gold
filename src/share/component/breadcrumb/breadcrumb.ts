import { Component, Input } from '@angular/core';
import { SharedModule } from '@share/module/shared.module';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    SharedModule
  ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss'
})
export class Breadcrumb {
  @Input() items: MenuItem[] | undefined = [];
}
