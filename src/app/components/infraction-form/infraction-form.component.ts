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
import { Router } from '@angular/router'; // Inyecta el Router
import jsPDF from 'jspdf';
import { FirebaseStorageService } from '../../services/firebase-storage.service';

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
  previews: string[] = [];
  selectedLocation: { lat: number; lng: number; streetName?: string } | null = null;
  map: any;
  selectedFiles: File[] = []; // Almacenar archivos seleccionados para subir

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
    private router: Router, // Inyecta el Router
    private storageService: FirebaseStorageService // Servicio de almacenamiento en Firebase
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
        const files = result as File[];
        this.selectedFiles = this.selectedFiles.concat(files);
        this.infractionForm.get('step3.imagenes')?.setValue(this.selectedFiles.map(file => file.name).join(','));

        // Generar vistas previas de las imágenes seleccionadas
        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };
          reader.readAsDataURL(file);
        });
      }
    });
  }

  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previews.splice(index, 1);
    this.infractionForm.get('step3.imagenes')?.setValue(this.selectedFiles.map(file => file.name).join(','));
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

  openColorDialog() {
    const dialogRef = this.dialog.open(ColorDialogComponent);
    dialogRef.afterClosed().subscribe(selectedColorName => {
      if (selectedColorName) {
        console.log(`Selected Color: ${selectedColorName}`);
        this.infractionForm.get('step2')?.get('color')?.setValue(selectedColorName);
      }
    });
  }

  openMotivoDialog() {
    const dialogRef = this.dialog.open(MotivoDialogComponent, {
      width: '600px',
      height: '500px',
      data: { selectedMotivos: this.infractionForm.get('step3')?.get('motivoDeMulta')?.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.infractionForm.get('step3')?.get('motivoDeMulta')?.setValue(result.motivos);
        this.infractionForm.get('step3')?.get('articuloFraccion')?.setValue(result.articulos);
        this.selectedMotivo = result;
      }
    });
  }
  goBackToHome() {
    this.router.navigate(['/home']);
  }

  onMotivoChange(): void {
    const motivoDeMultaId = parseInt(this.infractionForm.get('step3')?.get('motivoDeMulta')?.value, 10);
    this.selectedMotivo = this.motivosInfraccion.find(motivo => motivo.id_motivo === motivoDeMultaId);
    if (this.selectedMotivo) {
      this.infractionForm.get('step3')?.get('articuloFraccion')?.setValue(this.selectedMotivo.articulo);
    }
  }

  async uploadImages(): Promise<string[]> {
    const uploadPromises = this.selectedFiles.map(file => this.storageService.uploadFile(file));
    const uploadedUrls = await Promise.all(uploadPromises);
    return uploadedUrls;
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  async onSubmit(): Promise<void> {
    // Verificar primero que el formulario esté completo y válido.
    if (this.infractionForm.valid) {
      const formData = this.infractionForm.getRawValue();

      try {
        // Subir las imágenes a Firebase
        const uploadedImageUrls = await this.uploadImages();
        formData.step3.imagenes = uploadedImageUrls.join(',');

        console.log(formData); // Añadido para verificar los datos

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
          next: (response: any) => {
            console.log('Infracción registrada:', response);
            this.generatePDF(infractionData); // Generar y descargar el PDF
            this.infractionForm.reset();
            this.router.navigate(['/home']); // Redirige al home después del registro exitoso
          },
          error: (error: any) => {
            console.error('Error al registrar la infracción:', error);
            this.formError = 'No se pudo registrar la infracción. Inténtalo de nuevo.';
          }
        });
      } catch (error) {
        console.error('Error al subir las imágenes:', error);
        this.formError = 'No se pudo subir las imágenes. Inténtalo de nuevo.';
      }
    } else {
      this.formError = 'Completa todos los campos requeridos.';
    }
  }

  private generatePDF(data: any): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [210, 297] // Tamaño A4
    });

    doc.setFontSize(12);
    doc.text('Registro de Infracción', 10, 20);

    doc.setFontSize(10);
    let y = 30;

    const addText = (label: string, value: string) => {
      doc.text(`${label}:`, 10, y);
      doc.text(doc.splitTextToSize(value, 180), 10, y + 6);
      y += 14;
    };

    addText('ID del Policía', data.policiaId.toString());
    addText('Placas', data.placas);
    addText('Estado', data.estado);
    addText('Marca', data.marca);
    addText('Modelo', data.modelo);
    addText('Año', data.year.toString());
    addText('Color', data.color);
    addText('Motivo de la Multa', data.motivoDeMulta);
    addText('Artículo/Fracción', data.articuloFraccion);
    addText('Ubicación', data.ubicacion);
    addText('Nombre del Infractor', data.nombreInfractor);

    const filename = `${data.placas}-${this.getCurrentDate()}.pdf`;
    doc.save(filename);
  }

  private getCurrentDate(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son indexados desde 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
