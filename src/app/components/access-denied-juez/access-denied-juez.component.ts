import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied-juez',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">Acceso Denegado</h1>
        <p class="text-lg mb-6">No tienes permisos para ver esta página.</p>
        <button (click)="goHome()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Regresar al menú principal
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class AccessDeniedJuezComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home']);
  }
}
