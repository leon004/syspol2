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

    this.map.on('locationfound', (e: any) => {
      const { lat, lng } = e.latlng;
      this.selectedLocation = { lat, lng };
      L.marker([lat, lng]).addTo(this.map).bindPopup('Estás aquí').openPopup();
      this.fetchStreetName(lat, lng);
    });

    this.map.on('locationerror', (err: any) => {
      alert(`Error al obtener la ubicación: ${err.message}`);
    });
  }

  private fetchStreetName(lat: number, lng: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.selectedLocation = {
          lat,
          lng,
          streetName: data.address.road || 'Calle no encontrada'
        };
      })
      .catch(error => {
        console.error('Error al obtener el nombre de la calle:', error);
      });
  }

  registrarUbicacion(): void {
    if (this.selectedLocation && this.selectedLocation.streetName) {
      this.dialogRef.close(this.selectedLocation);
    } else {
      alert('Espere un momento para que se actualice el nombre de la calle, luego intente nuevamente.');
    }
  }
}
