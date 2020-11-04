import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffertProductsComponent } from './offert-products.component';


const routes: Routes = [
  {
    path: '',
    component: OffertProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffertProductsRoutingModule { }
