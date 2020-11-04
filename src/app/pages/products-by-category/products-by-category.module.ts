import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsByCategoryRoutingModule } from './products-by-category-routing.module';
import { ProductsByCategoryComponent } from './products-by-category.component';


@NgModule({
  declarations: [ProductsByCategoryComponent],
  imports: [
    CommonModule,
    ProductsByCategoryRoutingModule
  ]
})
export class ProductsByCategoryModule { }
