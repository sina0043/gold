import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  changeThemeColor$ = new Subject<void>();
  shoppingListChanged$ = new BehaviorSubject<void>(undefined);
  wishlistChanged$ = new Subject<void>();
}
