import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { BuycarComponent } from './pages/buycar/buycar.component';
import { OrderPaymentModule } from './pages/order-payment/order-payment.module';


const routes: Routes = [

      { path: "login", component: LoginComponent },

      { path: "register", component: RegisterComponent },

      { path: "Buy-Car",
        loadChildren: () => import('./pages/buycar/buycar.module').then(m => m.BuycarModule)},

        { path: "Order-Payment",
        loadChildren: () => import('./pages/order-payment/order-payment.module').then(m => m.OrderPaymentModule)},

        { path: "Offert-Products",
        loadChildren: () => import('./pages/offert-products/offert-products.module').then(m => m.OffertProductsModule)},

        { path: "Offert-Products",
        loadChildren: () => import('./pages/products-by-category/products-by-category.module').then(m => m.Pro)},
      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
