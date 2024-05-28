import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CarDetailComponent } from './car-detail.component';
import { InfractionService } from '../../services/infraction.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';  // Importar CUSTOM_ELEMENTS_SCHEMA

describe('CarDetailComponent', () => {
  let component: CarDetailComponent;
  let fixture: ComponentFixture<CarDetailComponent>;
  let infractionService: InfractionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [CarDetailComponent],
      providers: [
        InfractionService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'  // Simular un ID de infracción
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Agregar CUSTOM_ELEMENTS_SCHEMA
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailComponent);
    component = fixture.componentInstance;
    infractionService = TestBed.inject(InfractionService);
    spyOn(infractionService, 'getInfractionById').and.returnValue(of({
      id: 1,
      placas: 'ABC123',
      marca: 'Toyota',
      modelo: 'Corolla',
      motivoDeMulta: 'Speeding',
      ubicacion: 'Main Street',
      fecha: new Date(),
      imagenes: 'image1.jpg,image2.jpg'
    }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load infraction details on init', () => {
    expect(component.infractionDetails.placas).toBe('ABC123');
    expect(component.images.length).toBe(2);
  });

  it('should select an image', () => {
    component.selectImage(1);
    expect(component.selectedImageIndex).toBe(1);
  });
});
