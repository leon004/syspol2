import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied-admin',
  template: `
    <h1>Access Denied</h1>
    <p>You do not have permission to view this page.</p>
    <button (click)="goHome()">Go to Home</button>
  `,
  styles: []
})
export class AccessDeniedAdminComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/admin']);
  }
}
