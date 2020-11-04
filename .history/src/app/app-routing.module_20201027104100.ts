import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { BuycarComponent } from './pages/buycar/buycar.component';

const routes: Routes = [

      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "buycar", component: BuycarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
