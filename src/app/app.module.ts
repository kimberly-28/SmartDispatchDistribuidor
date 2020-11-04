import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Routes
import { AppRoutingModule } from "./app-routing.module";
import { PAGES_ROUTES } from "./pages/pages.route";
//Angular Maps
import { AgmCoreModule } from '@agm/core';

//Angular Material
import { MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';

//Htpp client
import { HttpClientModule } from '@angular/common/http';

//Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Pipes Module
import { PipesModule } from 'pipes-module';
import { FilterSitesPipe } from './pipes/sites/filter-sites.pipe';

import { AppComponent } from './app.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { GlobalDetailsComponent } from './pages/global-details/global-details.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventoryDetailsComponent } from './pages/inventory-details/inventory-details.component';
import { RegisterComponent } from './login/register/register.component';
import { OrdersDetailsComponent } from './pages/orders-details/orders-details.component';
import { StatesDetailsComponent } from './pages/states-details/states-details.component';
import { NotificationsReportsComponent } from './pages/notifications-reports/notifications-reports.component';
import { OrderDialogComponent } from './pages/orders-details/order-dialog/order-dialog.component';
import { InventoryEntryDetailsComponent } from './pages/inventory-details/inventory-entry-details/inventory-entry-details.component';
import { InventoryPublishedDetailsComponent } from './pages/inventory-details/inventory-published-details/inventory-published-details.component';
import { ProductsDetailsComponent } from './pages/products-details/products-details.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { HeaderComponent } from './shared/header/header.component';
import { MenuListItemComponent } from './shared/menu-list-item/menu-list-item.component';
import { TopNavComponent } from './shared/top-nav/top-nav.component';
import { EmployeeDialogComponent } from './pages/employee-details/employee-dialog/employee-dialog.component';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent,
    GlobalDetailsComponent,
    LoginComponent,
    InventoryDetailsComponent,
    RegisterComponent,
    OrdersDetailsComponent,
    StatesDetailsComponent,
    NotificationsReportsComponent,
    OrderDialogComponent,
    InventoryEntryDetailsComponent,
    InventoryPublishedDetailsComponent,
    ProductsDetailsComponent,
    SidenavComponent,
    HeaderComponent,
    MenuListItemComponent,
    TopNavComponent,
    EmployeeDialogComponent,
    FilterSitesPipe,
    PagesComponent
  ],
  imports: [

    PipesModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    PAGES_ROUTES,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBt8_sZvU3q9XW_kM6dfTq8fGaERwByfH0'
    }), BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
