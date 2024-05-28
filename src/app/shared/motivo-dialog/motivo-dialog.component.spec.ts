import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { MotivoDialogComponent } from './motivo-dialog.component';
import { DataService } from '../../services/data.service';

describe('MotivoDialogComponent', () => {
  let component: MotivoDialogComponent;
  let fixture: ComponentFixture<MotivoDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<MotivoDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      declarations: [MotivoDialogComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        DataService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
