import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { MenuManagementComponent } from './menu-management/menu-management.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    MenuManagementComponent,
    AdminDashboardComponent,
    OrderManagementComponent,
    AdminLoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatTabsModule,
    MatExpansionModule,
  ],
  exports: [
    MenuManagementComponent,
    AdminDashboardComponent,
    OrderManagementComponent,
    AdminLoginComponent,
  ],
})
export class AdminModule {}
