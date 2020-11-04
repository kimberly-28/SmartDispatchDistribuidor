import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { BuycarComponent } from './pages/buycar/buycar.component';

const routes: Routes = [

      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "buycar",
        loadChildren: () => import('./pages/buycar/buycar.module').then(m => m.BuycarModule)},
        { path: "orderpayment",
        loadChildren: () => import('./pages/order-payment/order-payment.module').then(m => m.BuycarModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
