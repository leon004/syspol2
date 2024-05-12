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
    { value: '#ffffff', name: 'Blanco' }
  ];

  constructor(private dialogRef: MatDialogRef<ColorDialogComponent>) {}

  selectColor(colorName: string) {
    this.dialogRef.close(colorName);
  }
}
