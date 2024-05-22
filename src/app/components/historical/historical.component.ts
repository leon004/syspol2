import { Component, OnInit } from '@angular/core';
import { InfractionService } from '../../services/infraction.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {
  historicalData: any[] = [];
  filteredData: any[] = [];
  searchText: string = '';
  isLoading: boolean = false;

  constructor(private infractionService: InfractionService, private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loadHistoricalData();
  }

  loadHistoricalData(): void {
    this.loaderService.show();
    const policiaId = localStorage.getItem('policiaId');
    console.log('policiaId:', policiaId); // Añade este log para verificar policiaId
    if (policiaId) {
      this.infractionService.getInfractionsByPoliciaId(policiaId).subscribe(
        data => {
          // Ordenar los datos por fecha, mostrando las más recientes primero
          this.historicalData = data.sort((a: { fecha: string | number | Date; }, b: { fecha: string | number | Date; }) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
          this.filteredData = this.historicalData;
          this.loaderService.hide();
        },
        error => {
          console.error('Error loading historical data', error);
          if (error.status === 403) {
            alert('Forbidden: You do not have the necessary permissions to access this resource.');
          } else {
            alert(`Error: ${error.message}`);
            this.loaderService.hide();
          }
        }
      );
    } else {
      console.error('No policiaId found in localStorage');
      this.loaderService.hide();
    }
  }

  onSearchTextChange(): void {
    this.filteredData = this.historicalData.filter(entry =>
      Object.values(entry).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(this.searchText.toLowerCase()) ||
        typeof value === 'number' && value.toString().toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }
}
