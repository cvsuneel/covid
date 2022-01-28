import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from './success/success.component';
import { ConfirmComponent } from './confirm/confirm.component';



@NgModule({
  declarations: [
    SuccessComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SuccessComponent,
    ConfirmComponent
  ]
})
export class PopoverComponentsModule { }
