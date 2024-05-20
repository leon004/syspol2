import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PoliciaGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = this.authService.getUserRole();
    console.log('PoliciaGuard: userRole =', userRole); // Añadir mensaje de depuración

    if (userRole === 'Policia' || userRole === 'Admin') {
      return true;
    }

    this.router.navigate(['/access-denied-policia']);
    return false;
  }
}
