import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('adminLoggedIn');
    this.router.navigate(['/admin/login']);
  }

  toCustomerPage(): void {
    this.router.navigate(['/']);
  }
}
