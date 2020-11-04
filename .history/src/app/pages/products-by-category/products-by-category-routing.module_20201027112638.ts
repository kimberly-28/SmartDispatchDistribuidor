import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsByCategoryComponent } from './products-by-category.component';


const routes: Routes = [

  {
    path: '',
    component: ProductsByCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsByCategoryRoutingModule { }
