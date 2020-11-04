import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPaymentRoutingModule } from './order-payment-routing.module';
import { OrderPaymentComponent } from './order-payment.component';


@NgModule({
  declarations: [OrderPaymentComponent],
  imports: [
    CommonModule,
    OrderPaymentRoutingModule
  ]
})
export class OrderPaymentModule { }
