import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { InfractionService } from '../../services/infraction.service';
import { DataService } from '../../services/data.service';
import { ColorDialogComponent } from '../../shared/color-dialog/color-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MotivoDialogComponent } from '../../shared/motivo-dialog/motivo-dialog.component';
import { LocationPickerDialogComponent } from '../../shared/location-picker-dialog/location-picker-dialog.component';
import { UploadImageDialogComponent } from '../../shared/upload-image-dialog/upload-image-dialog.component';
import { SharedService } from '../../services/shared.service'; // Importa el servicio compartido
import { Router } from '@angular/router'; // Importa el Router

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
export class InfractionFormComponent implements OnInit, AfterViewInit {
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
  selectedLocation: { lat: number; lng: number; streetName?: string } | null = null;
  map: any;

  @ViewChild('map') mapElement!: ElementRef;

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
    private sharedService: SharedService, // Inyecta el servicio compartido
    private router: Router // Inyecta el Router
  ) {
    // Obtener el policiaId y el usuario desde localStorage
    this.policiaId = localStorage.getItem('policiaId') || '';

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

    // Obtener el valor de las placas o VIN desde el servicio compartido
    this.sharedService.currentPlates.subscribe(plates => {
      this.infractionForm.get('step1.placas')?.setValue(plates);
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

  ngAfterViewInit() {
    // Iniciar el mapa solo si hay una ubicación seleccionada
    if (this.selectedLocation) {
      this.initMap();
    }
  }

  private initMap(): void {
    import('leaflet').then(L => {
      this.map = L.map(this.mapElement.nativeElement).setView([this.selectedLocation!.lat, this.selectedLocation!.lng], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(this.map);
      L.marker([this.selectedLocation!.lat, this.selectedLocation!.lng]).addTo(this.map)
        .bindPopup('Ubicación seleccionada').openPopup();
    });
  }

  openUploadImagesDialog(): void {
    const dialogRef = this.dialog.open(UploadImageDialogComponent, {
      width: '600px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const imageUrls = result.split(',');
        this.images = this.images.concat(imageUrls);
        this.infractionForm.get('step3.imagenes')?.setValue(this.images.join(','));
      }
    });
  }

  removeImage(image: string): void {
    this.images = this.images.filter(img => img !== image);
    this.infractionForm.get('step3.imagenes')?.setValue(this.images.join(','));
  }

  openLocationPicker(): void {
    const dialogRef = this.dialog.open(LocationPickerDialogComponent, {
      width: '80%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedLocation = result;
        const formattedLocation = `Latitud: ${result.lat}, Longitud: ${result.lng}, Nombre de la calle: ${result.streetName || 'Calle no encontrada'}`;
        this.infractionForm.get('step3')?.get('ubicacion')?.setValue(formattedLocation);
        this.initMap();  // Inicializar el mapa con la nueva ubicación seleccionada
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
          this.router.navigate(['/home']); // Redirige al home después del registro exitoso
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
