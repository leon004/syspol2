import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ColorDialogComponent } from './color-dialog/color-dialog.component';
import { InfractionFormComponent } from './infraction-form/infraction-form.component';
import { LoginComponent } from './login/login.component';
import { MotivoDialogComponent } from './motivo-dialog/motivo-dialog.component';
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
import { LocationPickerDialogComponent } from './location-picker-dialog/location-picker-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorDialogComponent,
    InfractionFormComponent,
    LoginComponent,
    MotivoDialogComponent,
    LocationPickerDialogComponent
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
    MatSelectModule,CommonModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
