import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { InfraccionMotivo } from '../../models';

@Component({
  selector: 'app-motivo-dialog',
  templateUrl: './motivo-dialog.component.html',
  styleUrls: ['./motivo-dialog.component.scss']
})
export class MotivoDialogComponent implements OnInit {
  motivosInfraccion: InfraccionMotivo[] = [];
  filteredMotivosInfraccion: InfraccionMotivo[] = [];

  constructor(
    public dialogRef: MatDialogRef<MotivoDialogComponent>,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.getInfraccionMotivos().subscribe(motivos => {
      this.motivosInfraccion = motivos;
      this.filteredMotivosInfraccion = motivos;
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




  selectMotivo(motivo: InfraccionMotivo) {
    this.dialogRef.close(motivo);
  }
}
