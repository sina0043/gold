import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedModule } from '@share/module/shared.module';

interface CalcRow {
  label: string;
  value: number;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.scss']
})
export class Calculator implements OnInit {
  form: FormGroup;

  private buyPerGram = 8579888;

  buyPrice = 0;
  sellPrice = 0;
  commission = 0;
  insurance = 0;
  tax = 0;
  extra = 0;

  calcResults: CalcRow[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      grams: [null] // فقط گرمی که کاربر وارد می‌کند
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      const grams = Number(this.form.get('grams')?.value) || 0;
      this.calculate(grams);
    });

    this.calculate(0); // مقدار اولیه صفر
  }

  private calculate(grams: number) {
    this.buyPrice = Math.round(grams * this.buyPerGram);
    this.commission = Math.round(this.buyPrice * 0.0005);
    this.insurance = Math.round(this.buyPrice * 0.0004);
    this.tax = Math.round(this.buyPrice * 0.0006);
    this.extra = Math.round(this.buyPrice * 0.0003);

    this.calcResults = [
      { label: 'قیمت خرید', value: this.buyPrice },
      { label: 'کارمزد', value: this.commission },
      { label: 'هزینه بیمه و نگهداری', value: this.insurance },
      { label: 'اجرت', value: this.extra },
      { label: 'مالیات', value: this.tax }
    ];
  }

  format(num: number) {
    return num.toLocaleString('fa-IR');
  }

  get totalPrice(): number {
    return this.buyPrice + this.commission + this.insurance + this.extra + this.tax;
  }
}
