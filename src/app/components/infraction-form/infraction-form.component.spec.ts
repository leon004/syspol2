import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button'; // Agrega este import
import { MatIconModule } from '@angular/material/icon'; // Agrega este import
import { MatMenuModule } from '@angular/material/menu'; // Agrega este import
import { InfractionFormComponent } from './infraction-form.component';
import { InfractionService } from '../../services/infraction.service';
import { DataService } from '../../services/data.service';
import { SharedService } from '../../services/shared.service';
import { FirebaseStorageService } from '../../services/firebase-storage.service';
import { AdminNavComponent } from '../admin-nav/admin-nav.component'; // Importa el componente

const firebaseConfig = {
  apiKey: "AIzaSyAastVsls81QPPB0N--vU0bM0-NjMrB9lo",
  authDomain: "syspol-storage.firebaseapp.com",
  projectId: "syspol-storage",
  storageBucket: "syspol-storage.appspot.com",
  messagingSenderId: "711653640080",
  appId: "1:711653640080:web:36511ae6940ad6fd5b5515"
};

describe('InfractionFormComponent', () => {
  let component: InfractionFormComponent;
  let fixture: ComponentFixture<InfractionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireStorageModule,
        MatStepperModule, // Importa el módulo del stepper
        MatButtonModule, // Importa el módulo de botones
        MatIconModule, // Importa el módulo de íconos
        MatMenuModule // Importa el módulo de menús
      ],
      declarations: [
        InfractionFormComponent,
        AdminNavComponent  // Declara el componente
      ],
      providers: [
        InfractionService,
        DataService,
        SharedService,
        FirebaseStorageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InfractionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
