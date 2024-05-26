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
  paginatedInfractions: any[] = [];
  isLoading: boolean = false;
  showAll: boolean = false;
  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalPages: number[] = [];

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
      (response: any[]) => {
        this.infractions = response.sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        this.applyFilter();
        this.calculateTotalPages();
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
    this.paginate();
  }

  filterByRecent() {
    this.filteredInfractions = [...this.infractions].sort((a, b) => {
      return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
    });
    this.paginate();
  }

  filterByOldest() {
    this.filteredInfractions = [...this.infractions].sort((a, b) => {
      return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    });
    this.paginate();
  }

  filterByBrand() {
    this.filteredInfractions = [...this.infractions].sort((a, b) => {
      return a.marca.localeCompare(b.marca);
    });
    this.paginate();
  }

  filterByArea() {
    this.filteredInfractions = [...this.infractions].sort((a, b) => {
      return a.ubicacion.localeCompare(b.ubicacion);
    });
    this.paginate();
  }

  viewInfractionDetails(infractionId: number) {
    this.router.navigate(['/car-detail', infractionId]);
  }

  paginate() {
    if (this.showAll) {
      this.paginatedInfractions = this.filteredInfractions;
    } else {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedInfractions = this.filteredInfractions.slice(start, end);
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.paginate();
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
    this.paginate();
  }

  calculateTotalPages() {
    const totalItems = this.filteredInfractions.length;
    const pages = Math.ceil(totalItems / this.itemsPerPage);
    this.totalPages = Array(pages).fill(0).map((x, i) => i);
  }
}
