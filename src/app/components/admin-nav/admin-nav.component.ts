import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importar correctamente desde @angular/router

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']  // Corregir 'styleUrls' en lugar de 'styleUrl'
})
export class AdminNavComponent implements OnInit {

  userRole: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('rol');
  }
}
