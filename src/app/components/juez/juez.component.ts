import { Component } from '@angular/core';
import { InfractionService } from '../../services/infraction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juez',
  templateUrl: './juez.component.html',
  styleUrls: ['./juez.component.css']
})
export class JuezComponent {
  searchText: string = '';
  infractions: any[] = [];
  filteredInfractions: any[] = [];

  constructor(private infractionService: InfractionService, private router: Router) {}

  ngOnInit() {
    this.loadInfractions();
  }

  loadInfractions() {
    this.infractionService.getAllInfractions().subscribe(
      (response: any) => {
        this.infractions = response;
        this.applyFilter();
      },
      (error: any) => {
        console.error('Error fetching infractions:', error);
      }
    );
  }

  applyFilter() {
    if (!this.searchText) {
      this.filteredInfractions = this.infractions;
    } else {
      this.filteredInfractions = this.infractions.filter(
        (infraction) =>
          infraction.folio.toLowerCase().includes(this.searchText.toLowerCase()) ||
          infraction.placas.toLowerCase().includes(this.searchText.toLowerCase()) ||
          infraction.marca.toLowerCase().includes(this.searchText.toLowerCase()) ||
          infraction.modelo.toLowerCase().includes(this.searchText.toLowerCase()) ||
          infraction.motivoDeMulta.toLowerCase().includes(this.searchText.toLowerCase()) ||
          infraction.ubicacion.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  filterByRecent() {
    this.filteredInfractions = [...this.infractions].sort((a, b) => {
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });
  }

  filterByOldest() {
    this.filteredInfractions = [...this.infractions].sort((a, b) => {
      return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    });
  }

  filterByBrand() {
    this.filteredInfractions = [...this.infractions].sort((a, b) => {
      return a.marca.localeCompare(b.marca);
    });
  }

  filterByArea() {
    this.filteredInfractions = [...this.infractions].sort((a, b) => {
      return a.ubicacion.localeCompare(b.ubicacion);
    });
  }

  viewInfractionDetails(infractionId: number) {
    this.router.navigate(['/car-detail', infractionId]);
  }
}
