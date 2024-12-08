import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
      this.router.navigate(['/admin/login']);
      return false;
    }
    return true;
  }
}
