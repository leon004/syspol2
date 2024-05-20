import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.loginError = null;

    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: response => {
          console.log('Usuario autenticado:', response);

          localStorage.setItem('token', response.token);
          localStorage.setItem('usuario', response.user.usuario);
          localStorage.setItem('policiaId', response.user.id.toString());
          localStorage.setItem('rol', response.user.rol); // Guardar el rol del usuario

          // Redirige según el rol
          const userRole = response.user.rol.toLowerCase(); // Convertir a minúsculas para comparación
          console.log('Rol del usuario:', userRole); // Mensaje de depuración

          if (userRole === 'admin') {
            console.log('Redirigiendo a /admin'); // Mensaje de depuración
            this.router.navigate(['/admin']);
          } else if (userRole === 'juez') {
            console.log('Redirigiendo a /juez'); // Mensaje de depuración
            this.router.navigate(['/juez']);
          } else if (userRole === 'policia') {
            console.log('Redirigiendo a /home'); // Mensaje de depuración
            this.router.navigate(['/home']);
          } else {
            console.log('Rol desconocido, redirigiendo a /login');
            this.router.navigate(['/login']);
          }
        },
        error: error => {
          console.error('Error al autenticar:', error);
          this.loginError = 'Credenciales incorrectas o error del servidor. Inténtalo de nuevo.';
        }
      });
    } else {
      this.loginError = 'Por favor, completa todos los campos requeridos.';
    }
  }
}
