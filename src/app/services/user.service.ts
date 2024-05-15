import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Obtener todos los usuarios
  getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Crear un nuevo usuario
  createUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Actualizar un usuario por ID
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, user, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Eliminar un usuario por ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }
}
