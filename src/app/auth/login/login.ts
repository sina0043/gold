import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '@share/module/shared.module';
import { InputUtilsService } from '@share/service/input-utils.service';
import { ResetPassword } from '../reset-password/reset-password';
import { MessageService } from 'primeng/api';
import { Register } from '../register/register';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    ResetPassword,
    Register
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {
  public inputUtilsService = inject(InputUtilsService);
  private messageService = inject(MessageService);

  loginForm!: FormGroup;
  visibleDialog: boolean = false;
  isShowLogin: boolean = true;
  isShowResetPassword: boolean = false;
  isShowRegister: boolean = false;
  resetPhoneNumber: string = '';

  loginFormSubmitted = false; // ✅ اضافه شد

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^09\d{9}$/),
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  showDialog() {
    this.visibleDialog = true;
  }

  closeDialog() {
    this.loginForm.reset();
    this.visibleDialog = false;
    this.isShowLogin = true;
    this.isShowResetPassword = false;
    this.isShowRegister = false;
    this.loginFormSubmitted = false; // ✅ ریست فلگ
  }

  onSubmit() {
    this.loginFormSubmitted = true; // ✅ فعال کردن نمایش خطاها
    if (this.loginForm.valid) {
      console.log('Form Data:', this.loginForm.value);
      this.messageService.add({ severity: 'success', detail: 'به بازر خوش آمدید' });
      this.loginForm.reset();
      this.visibleDialog = false;
      this.loginFormSubmitted = false; // ✅ بعد از موفقیت ریست می‌کنیم
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  resetPasswordClicked() {
    const phoneControl = this.loginForm.get('phoneNumber');

    if (!phoneControl?.value) {
      this.messageService.add({ severity: 'warn', detail: 'لطفا شماره موبایل خود را وارد کنید' });
      phoneControl?.markAsTouched();
      return;
    }

    if (phoneControl.invalid) {
      this.messageService.add({ severity: 'warn', detail: 'شماره موبایل وارد شده معتبر نیست' });
      phoneControl.markAsTouched();
      return;
    }

    this.isShowLogin = false;
    this.isShowResetPassword = true;
    this.resetPhoneNumber = phoneControl.value;
  }

  registerClicked() {
    this.isShowLogin = false;
    this.isShowResetPassword = false;
    this.isShowRegister = true;
  }
}
