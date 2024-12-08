import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  pin = '';
  correctPin = '1234'; // Replace with environment variable or backend call in production

  constructor(private router: Router) {}

  login(): void {
    if (this.pin === this.correctPin) {
      localStorage.setItem('adminLoggedIn', 'true'); // Persist login status
      this.router.navigate(['/admin']);
    } else {
      alert('Incorrect PIN. Please try again.');
    }
  }
}
