import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { ConsultaComponent } from './consulta.component';
import { InfractionService } from '../../services/infraction.service';

describe('ConsultaComponent', () => {
  let component: ConsultaComponent;
  let fixture: ComponentFixture<ConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule
      ],
      declarations: [ConsultaComponent],
      providers: [
        InfractionService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { platesOrVin: 'ABC123' } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
