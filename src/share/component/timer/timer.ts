import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '@share/module/shared.module';

@Component({
  selector: 'app-timer',
  imports: [
    SharedModule
  ],
  templateUrl: './timer.html',
  styleUrl: './timer.scss'
})
export class Timer {
  @Input() seconds: number = 120; // مقدار پیش‌فرض
  @Output() resendClicked = new EventEmitter<void>();

  showResend = false;
  countDown!: number;
  private interval: any;

  ngOnInit(): void {
    this.startCountdown();
  }

  private startCountdown(): void {
    this.countDown = this.seconds;
    this.showResend = false;

    if (this.interval) clearInterval(this.interval);

    this.interval = setInterval(() => {
      this.countDown -= 1;
      if (this.countDown <= 0) {
        clearInterval(this.interval);
        this.showResend = true;
      }
    }, 1000);
  }

  onResendClick(): void {
    this.resendClicked.emit();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
