import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  userRole: string | null = null;
  homeRoute: string = '/home'; // Ruta por defecto

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('rol');
    this.setHomeRoute();
  }

  setHomeRoute(): void {
    if (this.userRole === 'Admin') {
      this.homeRoute = '/admin-dashboard';
    } else if (this.userRole === 'Policia') {
      this.homeRoute = '/police-dashboard';
    } else if (this.userRole === 'Juez') {
      this.homeRoute = '/judge-dashboard';
    } else {
      this.homeRoute = '/default-dashboard';
    }
  }
}
