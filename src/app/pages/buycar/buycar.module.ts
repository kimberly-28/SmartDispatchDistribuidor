import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuycarRoutingModule } from './buycar-routing.module';
import { BuycarComponent } from './buycar.component';


@NgModule({
  declarations: [BuycarComponent],
  imports: [
    CommonModule,
    BuycarRoutingModule
  ]
})
export class BuycarModule { }
