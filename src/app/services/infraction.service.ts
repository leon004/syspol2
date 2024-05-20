import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Infraction {
  folio?: string; // Generado automáticamente
  policiaId: number; // ID del policía que registró la infracción
  placas: string; // Placas del vehículo infraccionado
  pais?: string; // País del vehículo
  estado?: string; // Estado de registro del vehículo
  marca: string; // Marca del vehículo
  modelo: string; // Modelo del vehículo
  year?: number; // Año de fabricación
  color?: string; // Color del vehículo
  motivoDeMulta: string; // Razón por la que se emite la infracción
  articuloFraccion: string; // Artículo o fracción infringida
  ubicacion: string; // Lugar donde se emitió la infracción
  nombreInfractor: string; // Nombre del conductor infraccionado
  fecha?: Date; // Fecha de la infracción
  hora?: Date; // Hora de la infracción
  imagenes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InfractionService {
  private baseUrl = 'http://localhost:3000/api/infractions';

  constructor(private http: HttpClient) {}

  // Helper method to create headers including the token
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token'); // Asegúrate de que 'token' es el nombre correcto
    if (!token) {
      throw new Error('No token found in localStorage');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Función para crear una nueva infracción
  createInfraction(infraction: Infraction): Observable<any> {
    return this.http.post(this.baseUrl, infraction, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Función para obtener una infracción por ID
  getInfractionById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Función para actualizar una infracción por ID
  updateInfraction(id: number, infraction: Infraction): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, infraction, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Función para eliminar una infracción por ID
  deleteInfraction(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Función para obtener infracciones por ID del policía
  getInfractionsByPoliciaId(policiaId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/policia/${policiaId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Función para obtener todas las infracciones
  getAllInfractions(): Observable<any> {
    return this.http.get(this.baseUrl, {
      headers: this.createAuthorizationHeader()
    });
  }
}
