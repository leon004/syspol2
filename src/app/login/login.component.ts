import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    // Inicializa el formulario con validadores para los campos requeridos
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Método ejecutado al enviar el formulario de inicio de sesión
  onSubmit(): void {
    // Limpia mensajes de error anteriores
    this.loginError = null;

    // Verifica si el formulario es válido
    if (this.loginForm.valid) {
      // Obtén las credenciales del formulario
      const credentials = this.loginForm.value;

      // Llama al servicio de autenticación con las credenciales del usuario
      this.authService.login(credentials).subscribe({
        next: response => {
          console.log('Usuario autenticado:', response);

          // Guarda el token en localStorage para futuras solicitudes
          localStorage.setItem('userToken', response.token);
          localStorage.setItem('usuario', response.usuario);
          localStorage.setItem('policiaId', response.user.id);

          // Redirige a la página de formulario de infracciones tras el login exitoso
          this.router.navigate(['/infraction']);
        },
        error: error => {
          console.error('Error al autenticar:', error);
          // Muestra un mensaje de error en el componente si la autenticación falla
          this.loginError = 'Credenciales incorrectas o error del servidor. Inténtalo de nuevo.';
        }
      });
    } else {
      // Si el formulario no es válido, muestra un mensaje de error
      this.loginError = 'Por favor, completa todos los campos requeridos.';
    }
  }
}
