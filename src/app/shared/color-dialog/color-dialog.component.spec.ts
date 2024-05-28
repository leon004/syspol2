import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ColorDialogComponent } from './color-dialog.component';

describe('ColorDialogComponent', () => {
  let component: ColorDialogComponent;
  let fixture: ComponentFixture<ColorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,  // Importa MatDialogModule
        BrowserAnimationsModule  // Importa BrowserAnimationsModule para las animaciones
      ],
      declarations: [ColorDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },  // Proporciona MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} }  // Proporciona MAT_DIALOG_DATA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
