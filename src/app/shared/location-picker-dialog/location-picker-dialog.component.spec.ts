import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationPickerDialogComponent } from './location-picker-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LocationPickerDialogComponent', () => {
  let component: LocationPickerDialogComponent;
  let fixture: ComponentFixture<LocationPickerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,  // Importa MatDialogModule
        BrowserAnimationsModule  // Importa BrowserAnimationsModule para soportar animaciones en Angular Material
      ],
      declarations: [LocationPickerDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },  // Proporciona MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} }  // Proporciona MAT_DIALOG_DATA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
