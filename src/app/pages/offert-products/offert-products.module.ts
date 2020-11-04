import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffertProductsRoutingModule } from './offert-products-routing.module';
import { OffertProductsComponent } from './offert-products.component';


@NgModule({
  declarations: [OffertProductsComponent],
  imports: [
    CommonModule,
    OffertProductsRoutingModule
  ]
})
export class OffertProductsModule { }
