// shared.module.ts
import { PrimeNGModules } from './prime-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [

  ],
  imports: [
    PrimeNGModules,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,   
  ],
  exports: [
    PrimeNGModules,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SharedModule { }
