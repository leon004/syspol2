import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UploadImageDialogComponent } from './upload-image-dialog.component';

describe('UploadImageDialogComponent', () => {
  let component: UploadImageDialogComponent;
  let fixture: ComponentFixture<UploadImageDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<UploadImageDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      declarations: [UploadImageDialogComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
