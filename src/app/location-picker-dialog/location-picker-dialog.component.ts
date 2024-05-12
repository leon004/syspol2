import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-location-picker-dialog',
  templateUrl: './location-picker-dialog.component.html',
  styleUrls: ['./location-picker-dialog.component.scss']
})
export class LocationPickerDialogComponent implements AfterViewInit {
  private map: any;
  private selectedLocation: { lat: number; lng: number; streetName?: string } | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private dialogRef: MatDialogRef<LocationPickerDialogComponent>) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadMap();
    }
  }

  private loadMap(): void {
    import('leaflet').then(L => {
      this.map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

      this.locateUser(L);
    });
  }

  private locateUser(L: any): void {
    this.map.locate({ setView: true, maxZoom: 16 });

    // Evento que se dispara cuando se encuentra la ubicación del usuario
    this.map.on('locationfound', (e: any) => {
      const { lat, lng } = e.latlng;
      console.log(`Ubicación encontrada: Latitud: ${lat}, Longitud: ${lng}`);
      this.selectedLocation = { lat, lng };

      // Añade un marcador en la ubicación actual
      L.marker([lat, lng]).addTo(this.map)
        .bindPopup('Estás aquí').openPopup();

      // Llama a la función para obtener el nombre de la calle
      this.fetchStreetName(lat, lng);
    });

    // Evento que se dispara cuando hay un error obteniendo la ubicación
    this.map.on('locationerror', (err: any) => {
      alert(`Error al obtener la ubicación: ${err.message}`);
    });
  }

  // Geocodificación inversa para obtener el nombre de la calle
  private fetchStreetName(lat: number, lng: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Verifica la estructura de la respuesta en la consola
        this.selectedLocation = {
          lat,
          lng,
          streetName: data.address.road || 'Calle no encontrada'
        };
        console.log(`Ubicación actualizada: ${JSON.stringify(this.selectedLocation)}`);
      })
      .catch(error => {
        console.error('Error al obtener el nombre de la calle:', error);
      });
  }

  registrarUbicacion(): void {
    if (this.selectedLocation && this.selectedLocation.streetName) {
      // Imprime la ubicación en el formato deseado
      console.log(`Ubicación actualizada: ${JSON.stringify(this.selectedLocation)}`);
      this.dialogRef.close(this.selectedLocation);
    } else {
      console.log('La información de la calle aún no está disponible.');
      alert('Espere un momento para que se actualice el nombre de la calle, luego intente nuevamente.');
    }
  }
}
