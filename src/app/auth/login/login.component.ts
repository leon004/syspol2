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
          if (response.user.rol === 'Juez') {
            this.router.navigate(['/juez']);
          } else {
            this.router.navigate(['/home']);
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
