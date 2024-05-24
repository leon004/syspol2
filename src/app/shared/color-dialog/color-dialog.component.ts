// color-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-color-dialog',
  template: `
    <h2 mat-dialog-title>Seleccione un Color</h2>
    <mat-dialog-content class="colors-container">
      <div *ngFor="let color of colores" (click)="selectColor(color.name)" [style.background-color]="color.value" class="color-circle"></div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .colors-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
    }
    .color-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
    }
  `]
})
export class ColorDialogComponent {
  colores = [
    { value: '#ff0000', name: 'Rojo' },
    { value: '#00ff00', name: 'Verde' },
    { value: '#0000ff', name: 'Azul' },
    { value: '#ffff00', name: 'Amarillo' },
    { value: '#ffffff', name: 'Blanco' },
    { value: '#000000', name: 'Negro' },
    { value: '#808080', name: 'Gris' },
    { value: '#800000', name: 'Marrón' },
    { value: '#ff00ff', name: 'Fucsia' },
    { value: '#00ffff', name: 'Cian' },
    { value: '#ffa500', name: 'Naranja' },
    { value: '#800080', name: 'Púrpura' },
    { value: '#008000', name: 'Verde Oscuro' },
    { value: '#000080', name: 'Azul Marino' },
    { value: '#ffd700', name: 'Dorado' },
    { value: '#c0c0c0', name: 'Plateado' },
    { value: '#4b0082', name: 'Índigo' },
    { value: '#dc143c', name: 'Carmesí' },
    { value: '#ff4500', name: 'Naranja Rojo' },
    { value: '#2e8b57', name: 'Verde Mar' },
    { value: '#b0c4de', name: 'Azul Claro' },
    { value: '#deb887', name: 'Beige' },
    { value: '#5f9ea0', name: 'Turquesa' },
    { value: '#7fff00', name: 'Chartreuse' },
    { value: '#d2691e', name: 'Chocolate' },
    { value: '#ff1493', name: 'Rosa Profundo' },
    { value: '#adff2f', name: 'Verde Amarillo' },
    { value: '#f0e68c', name: 'Caqui' },
    { value: '#e9967a', name: 'Salmón Oscuro' },
    { value: '#ff6347', name: 'Tomate' }
  ];

  constructor(private dialogRef: MatDialogRef<ColorDialogComponent>) {}

  selectColor(colorName: string) {
    this.dialogRef.close(colorName);
  }
}
