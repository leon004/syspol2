import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ConsultaComponent } from '../consulta/consulta.component';

@Component({
  selector: 'app-police-home',
  templateUrl: './police-home.component.html',
  styleUrls: ['./police-home.component.css']
})
export class PoliceHomeComponent {
  vehicleForm: FormGroup;
  inputLabel: string = "Placas";
  showError: boolean = false; // Bandera para controlar la visibilidad del mensaje de error

  // Definimos los patrones de validación
  placasPatterns = [
    /^[a-zA-Z]{3}-?\d{3}-?[a-zA-Z]$/,  // AAA-123-A  automivil
    /^[a-zA-Z]{2}-?\d{4}-?[a-zA-Z]$/,  // AA-1234-A  camioneta
    /^[a-zA-Z0-9]{6}$/,                // ABC123 or 123ABC motocicleta
    /^[a-zA-Z]-?\d{5}-?[a-zA-Z]$/,       // A-12345-A  transporte publico
    /^[a-zA-Z]-?\d{3}-?[a-zA-Z]{3}$/,    // A-123-AAA  taxi
    /^UCD-\d{5}$/,                      // UCD-12345  sin legalizar
    /^UCD-\d{6}$/                      // UCD-123456  sin legalizar

  ];

  // Combinamos todos los patrones en una sola expresión regular
  combinedPlacasPattern = new RegExp(this.placasPatterns.map(p => p.source).join('|'));

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {
    this.vehicleForm = this.fb.group({
      inputField: ['', [Validators.required, Validators.pattern(this.combinedPlacasPattern)]],
      inputType: ['placas']
    });

    this.vehicleForm.get('inputType')!.valueChanges.subscribe(value => {
      if (value === 'vin') {
        this.inputLabel = "VIN";
        this.vehicleForm.get('inputField')!.setValidators([Validators.required, Validators.pattern(/^[0-9A-Z]{17}$/)]);
        this.vehicleForm.get('inputField')!.updateValueAndValidity();
      } else {
        this.inputLabel = "Placas";
        this.vehicleForm.get('inputField')!.setValidators([Validators.required, Validators.pattern(this.combinedPlacasPattern)]);
        this.vehicleForm.get('inputField')!.updateValueAndValidity();
      }
    });
  }

  search() {
    this.showError = false; // Reiniciar la bandera de error

    if (this.vehicleForm.valid) {
      const platesOrVin = this.vehicleForm.get('inputField')!.value.replace(/-/g, '').toUpperCase();
      this.sharedService.updatePlates(platesOrVin);

      // Abrir el diálogo de consulta
      const dialogRef = this.dialog.open(ConsultaComponent, {
        data: { platesOrVin }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigate(['/infraction']);
        }
      });
    } else {
      // Mostrar mensaje de error solo cuando se haga clic en el botón de búsqueda
      this.showError = true;
    }
  }

  cancel() {
    this.vehicleForm.reset();
  }

  onInputChange() {
    this.vehicleForm.get('inputField')!.setValue('');
  }
}
