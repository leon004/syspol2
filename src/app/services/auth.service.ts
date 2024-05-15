import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  // Función para iniciar sesión
  login(credentials: { usuario: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Función para registrar un nuevo usuario
  register(user: {
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    usuario: string,
    password: string,
    rol: string
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
