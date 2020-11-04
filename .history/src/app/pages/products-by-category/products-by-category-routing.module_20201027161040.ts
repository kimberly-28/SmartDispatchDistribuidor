import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsByCategoryComponent } from './products-by-category.component';
import { ProductsByCategoryModule } from './products-by-category.module';


const routes: Routes = [

  {
    path: '',
    component: ProductsByCategoryC
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsByCategoryRoutingModule { }
