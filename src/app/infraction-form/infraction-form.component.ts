import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { InfractionService } from '../infraction.service';
import { DataService } from '../data.service';
import { ColorDialogComponent } from '../color-dialog/color-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MotivoDialogComponent } from '../motivo-dialog/motivo-dialog.component';
import { LocationPickerDialogComponent } from '../location-picker-dialog/location-picker-dialog.component';
import { FirebaseStorageService } from '../firebase-storage.service';
import { UploadImageDialogComponent } from '../upload-image-dialog/upload-image-dialog.component';

interface Year {
  value: string;
  viewValue: string;
}

interface InfraccionMotivo {
  id_motivo: number;
  motivo: string;
  articulo: string;
  tipo: number;
  publicacion: string;
}

@Component({
  selector: 'app-infraction-form',
  templateUrl: './infraction-form.component.html',
  styleUrls: ['./infraction-form.component.scss']
})
export class InfractionFormComponent implements OnInit {
  infractionForm: FormGroup;
  formError: string | null = null;
  marcas: any[] = [];
  modelos: string[] = [];
  estados: any[] = [];
  years: Year[] = [];
  policiaId: string;
  motivosInfraccion: InfraccionMotivo[] = [];
  selectedMotivo: InfraccionMotivo | undefined;
  images: string[] = [];

  colores = [
    { value: '#ff0000', name: 'Rojo' },
    { value: '#00ff00', name: 'Verde' },
    { value: '#0000ff', name: 'Azul' },
    { value: '#ffff00', name: 'Amarillo' },
    { value: '#ffffff', name: 'Blanco' }
  ];

  constructor(
    private fb: FormBuilder,
    private infractionService: InfractionService,
    private dataService: DataService,
    public dialog: MatDialog,

  ) {
    // Obtener el policiaId y el usuario desde localStorage
    this.policiaId = localStorage.getItem('policiaId') || '';
    const usuario = localStorage.getItem('usuario') || '';

    // Configurar el formulario
    this.infractionForm = this.fb.group({
      step1: this.fb.group({
        policiaId: [{ value: this.policiaId, disabled: true }, Validators.required],
        placas: ['', Validators.required],
        pais: ['México'], // País predeterminado
        estado: ['', Validators.required]
      }),
      step2: this.fb.group({
        marca: ['', Validators.required],
        modelo: ['', Validators.required],
        year: ['', Validators.required],
        color: ['']
      }),
      step3: this.fb.group({
        motivoDeMulta: ['', Validators.required],
        articuloFraccion: [''],
        ubicacion: ['', Validators.required],
        nombreInfractor: ['', Validators.required],
        imagenes: ['']
      })
    });

    // Obtener datos para los selectores
    this.dataService.getMarcas().subscribe(marcas => {
      this.marcas = marcas;
    });

    this.dataService.getEstados().subscribe(estados => {
      this.estados = estados;
    });

    this.dataService.getYears().subscribe(years => {
      this.years = years;
    });

    this.dataService.getInfraccionMotivos().subscribe(motivos => {
      this.motivosInfraccion = motivos;
    });
  }

  ngOnInit(): void {
    // Actualizar la lista de modelos cuando se cambia la marca
    const marcaControl = this.infractionForm.get('step2.marca');
    if (marcaControl) {
      marcaControl.valueChanges.pipe(
        switchMap(marca => this.dataService.getModelosPorMarca(marca))
      ).subscribe(modelos => {
        this.modelos = modelos;
      }, error => {
        console.error('Error al cargar modelos:', error);
        this.modelos = [];
      });
    }
  }

  openUploadImagesDialog(): void {
    const dialogRef = this.dialog.open(UploadImageDialogComponent, {
      width: '600px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.infractionForm.get('step3.imagenes')?.setValue(result);
      }
    });
  }


  openLocationPicker(): void {
    const dialogRef = this.dialog.open(LocationPickerDialogComponent, {
      width: '80%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Usa el formato específico con el nombre de la calle, si está disponible
        const formattedLocation = `Latitud: ${result.lat}, Longitud: ${result.lng}, Nombre de la calle: ${result.streetName || 'Calle no encontrada'}`;
        this.infractionForm.get('step3')?.get('ubicacion')?.setValue(formattedLocation);
      }
    });
  }



  openColorDialog(){
    const dialogRef = this.dialog.open(ColorDialogComponent);
    dialogRef.afterClosed().subscribe(selectedColorName => {
      if(selectedColorName){
        console.log(`Selected Color: ${selectedColorName}`);
        this.infractionForm.get('step2')?.get('color')?.setValue(selectedColorName);
      }
    });
  }
  openMotivoDialog() {
    const dialogRef = this.dialog.open(MotivoDialogComponent, {
      width: '600px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.infractionForm.get('step3')?.get('motivoDeMulta')?.setValue(result.motivo);
        this.infractionForm.get('step3')?.get('articuloFraccion')?.setValue(result.articulo);
        this.selectedMotivo = result;
      }
    });
  }



  onMotivoChange(): void {
    const motivoDeMultaId = parseInt(this.infractionForm.get('step3')?.get('motivoDeMulta')?.value, 10);
    this.selectedMotivo = this.motivosInfraccion.find(motivo => motivo.id_motivo === motivoDeMultaId);
    if (this.selectedMotivo) {
      // Asignar el valor del artículo al control
      this.infractionForm.get('step3')?.get('articuloFraccion')?.setValue(this.selectedMotivo.articulo);
    }
  }

  onSubmit(): void {
    // Verificar primero que el formulario esté completo y válido.
    if (this.infractionForm.valid) {
      const formData = this.infractionForm.getRawValue();

      // Procesar los datos del formulario antes de enviarlos
      const infractionData = {
        policiaId: parseInt(formData.step1.policiaId, 10),
        placas: formData.step1.placas,
        estado: formData.step1.estado,
        marca: formData.step2.marca,
        modelo: formData.step2.modelo,
        year: parseInt(formData.step2.year, 10),
        color: formData.step2.color,
        motivoDeMulta: formData.step3.motivoDeMulta,
        articuloFraccion: formData.step3.articuloFraccion,
        ubicacion: formData.step3.ubicacion,
        nombreInfractor: formData.step3.nombreInfractor,
        imagenes: formData.step3.imagenes
      };

      // Llamar al servicio para enviar los datos
      this.infractionService.createInfraction(infractionData).subscribe({
        next: response => {
          console.log('Infracción registrada:', response);
          this.infractionForm.reset();
        },
        error: error => {
          console.error('Error al registrar la infracción:', error);
          this.formError = 'No se pudo registrar la infracción. Inténtalo de nuevo.';
        }
      });
    } else {
      this.formError = 'Completa todos los campos requeridos.';
    }
  }
}
