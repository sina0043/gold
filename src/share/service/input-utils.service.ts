import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputUtilsService {
  /**
   * فقط اجازه ورود اعداد (0-9) را می‌دهد
   * @param event KeyboardEvent
   */
  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
