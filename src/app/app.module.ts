import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';
import { environment } from './environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MenuComponent } from './customer/menu/menu.component';
import { OrderComponent } from './customer/order/order.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { MenuManagementComponent } from './admin/menu-management/menu-management.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';


import { MenuManagementModule } from './admin/menu-management/menu-management.module';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OrderComponent,
    AdminDashboardComponent,
    MenuManagementComponent,
    OrderManagementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MenuManagementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
