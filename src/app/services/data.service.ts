import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InfraccionMotivo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getMarcas(): Observable<any[]> {
    return this.http.get<any[]>('../assets/marcas.json');
  }

  getModelosPorMarca(marca: string): Observable<string[]> {
    return this.http.get<{[key: string]: string[]}>('../assets/modelos.json').pipe(
      map(modelos => modelos[marca] || [])
    );
  }

  getPaises(): Observable<any[]> {
    return this.http.get<any[]>('../assets/paises.json');
  }
  getEstadoPorPais(pais: string): Observable<string[]> {
    return this.http.get<{[key: string]: string[]}>('../assets/estados.json').pipe(
      map(estados => estados[pais] || [])
    );
  }
  // getEstados(): Observable<any[]> {
  //   return this.http.get<any[]>('../assets/estados.json');
  // }

  getYears(): Observable<any[]> {
    return this.http.get<any[]>('/assets/years.json');
  }

  // Método para obtener los motivos de infracción
  getInfraccionMotivos(): Observable<any[]> {
    return this.http.get<InfraccionMotivo[]>('/assets/infraccion_motivo.json');
  }
}
