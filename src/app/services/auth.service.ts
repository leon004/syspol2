import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  login(credentials: { usuario: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('AuthService: payload.rol =', payload.rol); // Añadir mensaje de depuración
        return payload.rol;
      } catch (e) {
        console.error('Error parsing token:', e);
        return null;
      }
    }
    return null;
  }
}
