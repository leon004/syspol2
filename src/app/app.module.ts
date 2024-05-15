import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ColorDialogComponent } from './shared/color-dialog/color-dialog.component';
import { InfractionFormComponent } from './components/infraction-form/infraction-form.component';
import { LoginComponent } from './auth/login/login.component';
import { MotivoDialogComponent } from './shared/motivo-dialog/motivo-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

// Material Imports
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationPickerDialogComponent } from './shared/location-picker-dialog/location-picker-dialog.component';
// Import AngularFireModule
import { AngularFireModule } from '@angular/fire/compat';

// Import AngularFireStorageModule
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../enviroments/enviroment';
import { UploadImageDialogComponent } from './shared/upload-image-dialog/upload-image-dialog.component';
import { BottomNavComponent } from './shared/bottom-nav/bottom-nav.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { PoliceHomeComponent } from './components/police-home/police-home.component';
import { JuezComponent } from './components/juez/juez.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    ColorDialogComponent,
    InfractionFormComponent,
    LoginComponent,
    MotivoDialogComponent,
    LocationPickerDialogComponent,
    UploadImageDialogComponent,
    BottomNavComponent,
    CarDetailComponent,
    HistoricalComponent,
    PoliceHomeComponent,
    JuezComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,CommonModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
