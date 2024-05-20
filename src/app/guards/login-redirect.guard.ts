import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const userRole = this.authService.getUserRole();
        if (userRole === 'Policia') {
          this.router.navigate(['/home']);
        } else if (userRole === 'Juez') {
          this.router.navigate(['/juez']);
        } else if (userRole === 'Admin') {
          this.router.navigate(['/admin']);
        }
        return false;
      }
      return true;
    } else {
      return true;  // Permite acceso a la página de login si localStorage no está disponible
    }
  }
}
