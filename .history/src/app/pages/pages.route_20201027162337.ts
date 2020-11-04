import { RouterModule, Routes } from '@angular/router';
import { GlobalDetailsComponent } from './global-details/global-details.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AuthguardGuard } from '../authguard.guard';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { InventoryEntryDetailsComponent } from './inventory-details/inventory-entry-details/inventory-entry-details.component';
import { InventoryPublishedDetailsComponent } from './inventory-details/inventory-published-details/inventory-published-details.component';
import { StatesDetailsComponent } from './states-details/states-details.component';
import { NotificationsReportsComponent } from './notifications-reports/notifications-reports.component';
import { PagesComponent } from './pages.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';



const pagesRoutes: Routes = [

  {
    path: '',
    component: PagesComponent,
    children: [
      { path: "globaldetails/:id", component: GlobalDetailsComponent , canActivate: [AuthguardGuard] },
      { path: "employeedetails/:id", component: EmployeeDetailsComponent , canActivate: [AuthguardGuard]  },
        { path: "productsdetails/:id", component: ProductsDetailsComponent , canActivate: [AuthguardGuard]  },
      { path: "productsdetails/:id", component: ProductsDetailsComponent , canActivate: [AuthguardGuard]  },
      { path: "inventorydetails/:id", component: InventoryDetailsComponent , canActivate: [AuthguardGuard] },
      { path: "inventoryentrydetails/:id", component: InventoryEntryDetailsComponent , canActivate: [AuthguardGuard] },
      { path: "inventorypublisheddetails/:id", component: InventoryPublishedDetailsComponent , canActivate: [AuthguardGuard] },     { path: "ordersdetails/:id", component: OrdersDetailsComponent , canActivate: [AuthguardGuard]  },
      { path: "notifications/:id", component: NotificationsReportsComponent  , canActivate: [AuthguardGuard] },
      { path: "", redirectTo: "login", pathMatch: "full" }

      ]
    }
  ];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
