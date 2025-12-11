import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Timer } from '@share/component/timer/timer';
import { SharedModule } from '@share/module/shared.module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SharedModule, 
    Timer
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  messageService = inject(MessageService);

  @Output() registered = new EventEmitter<void>();

  registerForm!: FormGroup;
  otpForm!: FormGroup;
  phoneNumber: string = '';

  isShowOtpForm: boolean = false;

  registerFormSubmitted = false;
  otpFormSubmitted = false;

  constructor(private fb: FormBuilder) {
    // فرم ثبت‌نام
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^09\d{9}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        accept: [false, Validators.requiredTrue]
      },
      { validators: this.passwordsMatchValidator }
    );

    // فرم OTP
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  // ولیدیشن سفارشی → رمز عبور و تکرار آن باید برابر باشند
  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { mismatch: true };
  }

  // ارسال فرم ثبت‌نام
  onSubmitRegisterForm() {
    this.registerFormSubmitted = true;
    if (this.registerForm.valid) {
      this.phoneNumber = this.registerForm.get('phoneNumber')?.value;
      this.isShowOtpForm = true;
      this.registerFormSubmitted = false;
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  // ارسال فرم OTP
  onSubmitOtpForm() {
    this.otpFormSubmitted = true;
    if (this.otpForm.valid) {
      this.messageService.add({ severity: 'success', detail: 'ثبت‌نام با موفقیت انجام شد' });
      this.registered.emit();
      this.otpForm.reset();
      this.registerForm.reset();
      this.isShowOtpForm = false;
      this.otpFormSubmitted = false;
    } else {
      this.otpForm.markAllAsTouched();
    }
  }

  handleResend() {
    this.messageService.add({ severity: 'info', detail: 'کد جدید ارسال شد' });
  }

  isInvalid(form: FormGroup, controlName: string, errorType?: string) {
    const control = form.get(controlName);
    if (!control) return false;

    const submitted = form === this.registerForm ? this.registerFormSubmitted : this.otpFormSubmitted;

    if (errorType) {
      return control.hasError(errorType) && submitted;
    }
    return control.invalid && submitted;
  }

  visibleDialog: boolean = false;

  showDialog() {
    this.visibleDialog = true;
  }

  closeDialog() {
    this.visibleDialog = false;
  }
}
