import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';  // Importa MatMenuModule
import { RouterTestingModule } from '@angular/router/testing';

import { AdminNavComponent } from './admin-nav.component';

describe('AdminNavComponent', () => {
  let component: AdminNavComponent;
  let fixture: ComponentFixture<AdminNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,  // Importa MatIconModule aquí
        MatMenuModule,  // Importa MatMenuModule aquí
        NoopAnimationsModule  // Importa NoopAnimationsModule para soportar animaciones en Angular Material
      ],
      declarations: [AdminNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
