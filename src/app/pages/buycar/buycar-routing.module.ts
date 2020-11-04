import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuycarComponent } from './buycar.component';

const routes: Routes = [

  {
    path: '',
    component: BuycarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuycarRoutingModule { }
