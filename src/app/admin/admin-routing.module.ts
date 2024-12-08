import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuManagementComponent } from './menu-management/menu-management.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
    { 
        path: 'admin', 
        component: AdminDashboardComponent, 
        // children: [
        //     { path: 'menu', component: MenuManagementComponent },
        // ] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
