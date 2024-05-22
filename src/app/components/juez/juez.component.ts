import { Component, OnInit } from '@angular/core';
import { InfractionService } from '../../services/infraction.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-juez',
  templateUrl: './juez.component.html',
  styleUrls: ['./juez.component.css']
})
export class JuezComponent implements OnInit {
  searchText: string = '';
  infractions: any[] = [];
  filteredInfractions: any[] = [];
  isLoading: boolean = false;

  constructor(
    private infractionService: InfractionService, 
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
    this.loadInfractions();
  }

  loadInfractions() {
    this.loaderService.show();
    this.infractionService.getAllInfractions().subscribe(
      (response: any[]) => { // Aquí asumo que response es un array de cualquier tipo de objeto
        // Ordenar las infracciones por fecha de manera descendente
        this.infractions = response.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        this.applyFilter();
        this.loaderService.hide();
      },
      (error: any) => {
        console.error('Error fetching infractions:', error);
        this.loaderService.hide();
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
