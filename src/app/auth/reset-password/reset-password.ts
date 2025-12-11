import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Timer } from '@share/component/timer/timer';
import { SharedModule } from '@share/module/shared.module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [SharedModule, Timer],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss']
})
export class ResetPassword {
  messageService = inject(MessageService);

  @Input() phoneNumber: string = '';
  @Output() passwordChanged = new EventEmitter<void>();
  otpForm!: FormGroup;
  resetForm!: FormGroup;
  isShowOtpForm: boolean = true;
  resetFormSubmitted = false;
  otpFormSubmitted = false;
  
  constructor(private fb: FormBuilder) {
    // فرم OTP
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(5)]]
    });

    // فرم ریست پسورد
    this.resetForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // ولیدیشن سفارشی → دو پسورد باید برابر باشند
  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { mismatch: true };
  }

  onSubmitOtpForm() {
    this.otpFormSubmitted = true;
    if (this.otpForm.valid) {
      this.isShowOtpForm = false;
      this.otpForm.reset();
      this.otpFormSubmitted = false;
    } else {
      this.otpForm.markAllAsTouched();
    }
  }

  onSubmitResetForm() {
    this.resetFormSubmitted = true;
    if (this.resetForm.valid) {
      this.messageService.add({ severity: 'success', detail: 'رمز عبور با موفقیت تغییر کرد' });
      this.passwordChanged.emit();
      this.resetForm.reset();
      this.resetFormSubmitted = false;
    } else {
      this.resetForm.markAllAsTouched();
    }
  }

  handleResend() {
    this.messageService.add({ severity: 'info', detail: 'کد جدید ارسال شد' });
  }

  isInvalid(form: FormGroup, controlName: string, errorType?: string) {
    const control = form.get(controlName);
    if (!control) return false;

    const submitted = form === this.resetForm ? this.resetFormSubmitted : this.otpFormSubmitted;

    if (errorType) {
      return control.hasError(errorType) && submitted;
    }
    return control.invalid && submitted;
  }
}
