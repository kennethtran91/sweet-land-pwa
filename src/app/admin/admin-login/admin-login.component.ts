import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  private readonly adminPassword = environment.ADMIN_PASSWORD;
  pin = '';

  constructor(private router: Router) {}

  login(): void {
    if (this.pin === this.adminPassword) {
      localStorage.setItem('adminLoggedIn', 'true'); // Persist login status
      this.router.navigate(['/admin']);
    } else {
      alert('Incorrect PIN. Please try again.');
    }
  }
}
