import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private router: Router) {}

  logout() {
    if (typeof localStorage !== 'undefined') {
      console.log('Logout method called'); // Verifica que el método se esté llamando
      localStorage.removeItem('token');  // Eliminar el token de autenticación
      localStorage.removeItem('user');   // Eliminar el usuario
      localStorage.removeItem('role');   // Eliminar el rol
      this.router.navigate(['/login']);  // Redirigir al usuario al login
    }
  }
}
