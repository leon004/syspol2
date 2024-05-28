import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PoliceHomeComponent } from './police-home.component';
import { SharedService } from '../../services/shared.service';

describe('PoliceHomeComponent', () => {
  let component: PoliceHomeComponent;
  let fixture: ComponentFixture<PoliceHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoliceHomeComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatRadioModule, // Importa MatRadioModule aquí
        RouterTestingModule
      ],
      providers: [SharedService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
