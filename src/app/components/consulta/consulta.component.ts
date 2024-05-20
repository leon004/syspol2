import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InfractionService } from '../../services/infraction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  searchText: string = '';
  infractions: any[] = [];
  filteredInfractions: any[] = [];

  constructor(
    private infractionService: InfractionService,
    private dialogRef: MatDialogRef<ConsultaComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { platesOrVin: string }
  ) {}

  ngOnInit() {
    this.loadInfractions();
  }

  loadInfractions() {
    this.infractionService.getAllInfractions().subscribe(
      (response: any) => {
        this.infractions = response.filter((infraction: { placas: string; vin: string; }) =>
          infraction.placas.toLowerCase().includes(this.data.platesOrVin.toLowerCase()) ||
          infraction.vin?.toLowerCase().includes(this.data.platesOrVin.toLowerCase())
        );
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

  goToInfractionForm() {
    this.dialogRef.close(true);
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
