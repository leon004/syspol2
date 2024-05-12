import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { InfractionService } from '../infraction.service';
import { DataService } from '../data.service';

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
  motivosInfraccion: InfraccionMotivo[] = [];
  selectedMotivo: InfraccionMotivo | undefined;

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
    private dataService: DataService
  ) {
    this.infractionForm = this.fb.group({
      step1: this.fb.group({
        policiaId: ['', Validators.required],
        placas: ['', Validators.required],
        pais: [''],
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

  onMotivoChange(): void {
    const motivoDeMultaId = parseInt(this.infractionForm.get('step3')?.get('motivoDeMulta')?.value, 10);
    this.selectedMotivo = this.motivosInfraccion.find(motivo => motivo.id_motivo === motivoDeMultaId);
    if (this.selectedMotivo) {
      // Asignar el valor del artículo al control
      this.infractionForm.get('step3')?.get('articuloFraccion')?.setValue(this.selectedMotivo.articulo);
    }
  }

  onSubmit(): void {
    if (this.infractionForm.valid) {
      const step2 = this.infractionForm.get('step2')?.value || {};
      const year = parseInt(step2.year, 10) || null;

      const infractionData = {
        ...this.infractionForm.get('step1')?.value,
        ...step2,
        year,
        ...this.infractionForm.get('step3')?.value,
        imagenes: this.infractionForm.get('step3')?.get('imagenes')?.value.split(',').map((link: string) => link.trim()).join(',')
      };

      this.infractionService.createInfraction(infractionData).subscribe({
        next: response => {
          console.log('Infracción registrada:', response);
          this.infractionForm.reset(); // Restablecer el formulario después del envío
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
