import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { MenuManagementComponent } from './admin/menu-management/menu-management.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';

const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent, children: [
      { path: 'menu', component: MenuManagementComponent },
      { path: 'orders', component: OrderManagementComponent }
  ] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
