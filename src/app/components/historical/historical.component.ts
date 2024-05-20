import { Component, OnInit } from '@angular/core';
import { InfractionService } from '../../services/infraction.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {
  historicalData: any[] = [];
  filteredData: any[] = [];
  searchText: string = '';

  constructor(private infractionService: InfractionService) { }

  ngOnInit(): void {
    this.loadHistoricalData();
  }

  loadHistoricalData(): void {
    const policiaId = localStorage.getItem('policiaId');
    console.log('policiaId:', policiaId); // Añade este log para verificar policiaId
    if (policiaId) {
      this.infractionService.getInfractionsByPoliciaId(policiaId).subscribe(
        data => {
          // Ordenar los datos por fecha, mostrando las más recientes primero
          this.historicalData = data.sort((a: { fecha: string | number | Date; }, b: { fecha: string | number | Date; }) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
          this.filteredData = this.historicalData;
        },
        error => console.error('Error loading historical data', error)
      );
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
