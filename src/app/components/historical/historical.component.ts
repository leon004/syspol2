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
    if (policiaId) {
      this.infractionService.getInfractionsByPoliciaId(policiaId).subscribe(
        data => {
          this.historicalData = data;
          this.filteredData = data;
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
