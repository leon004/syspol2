import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { InfraccionMotivo } from '../../models';

interface InfraccionMotivoExtendido extends InfraccionMotivo {
  selected: boolean;
}

@Component({
  selector: 'app-motivo-dialog',
  templateUrl: './motivo-dialog.component.html',
  styleUrls: ['./motivo-dialog.component.scss']
})
export class MotivoDialogComponent implements OnInit {
  motivosInfraccion: InfraccionMotivoExtendido[] = [];
  filteredMotivosInfraccion: InfraccionMotivoExtendido[] = [];
  private selectedMotivosState: { [key: number]: boolean } = {};

  constructor(
    public dialogRef: MatDialogRef<MotivoDialogComponent>,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.getInfraccionMotivos().subscribe(motivos => {
      this.motivosInfraccion = motivos.map(motivo => ({
        ...motivo,
        selected: this.selectedMotivosState[motivo.id_motivo] || false
      }));
      this.filteredMotivosInfraccion = this.motivosInfraccion;
    });
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value;
    if (!filterValue) {
      this.filteredMotivosInfraccion = this.motivosInfraccion;
    } else {
      this.filteredMotivosInfraccion = this.motivosInfraccion.filter(motivo =>
        motivo.motivo.toLowerCase().includes(filterValue.toLowerCase()) ||
        motivo.articulo.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
  }

  confirmSelection() {
    const selectedMotivos = this.motivosInfraccion.filter(motivo => motivo.selected);
    selectedMotivos.forEach(motivo => this.selectedMotivosState[motivo.id_motivo] = motivo.selected);
    const selectedMotivosString = selectedMotivos.map(motivo => motivo.motivo).join(', ');
    const selectedArticulosString = selectedMotivos.map(motivo => motivo.articulo).join(', ');
    this.dialogRef.close({ motivos: selectedMotivosString, articulos: selectedArticulosString });
  }
}
