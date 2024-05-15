import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredRoles = next.data['roles'] as Array<string>;  // Roles requeridos para la ruta
    const userRole = localStorage.getItem('rol');              // Obtiene el rol del usuario del localStorage

    if (userRole && requiredRoles.includes(userRole)) {
      return true;  // Si el rol del usuario está en la lista de roles permitidos, acceso concedido
    } else {
      this.router.navigate(['/no-access']);  // Redirige a una página de "Acceso Denegado"
      return false;  // Acceso denegado
    }
  }
}
