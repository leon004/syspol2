import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { InfractionFormComponent } from './components/infraction-form/infraction-form.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { PoliceHomeComponent } from './components/police-home/police-home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { JuezComponent } from './components/juez/juez.component';
import { AdminComponent } from './components/admin/admin.component';
import { AccessDeniedAdminComponent } from './components/access-denied-admin/access-denied-admin.component';
import { AccessDeniedJuezComponent } from './components/access-denied-juez/access-denied-juez.component';
import { AccessDeniedPoliciaComponent } from './components/access-denied-policia/access-denied-policia.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { JuezGuard } from './guards/juez.guard';
import { PoliciaGuard } from './guards/policia.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'home', component: PoliceHomeComponent, canActivate: [PoliciaGuard] },
  { path: 'infraction', component: InfractionFormComponent, canActivate: [PoliciaGuard] },
  { path: 'historical', component: HistoricalComponent, canActivate: [PoliciaGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: 'juez', component: JuezComponent, canActivate: [JuezGuard] },
  { path: 'car-detail/:id', component: CarDetailComponent, canActivate: [JuezGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'access-denied-admin', component: AccessDeniedAdminComponent },
  { path: 'access-denied-juez', component: AccessDeniedJuezComponent },
  { path: 'access-denied-policia', component: AccessDeniedPoliciaComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' } // Redirigir cualquier ruta no reconocida a login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard, JuezGuard, PoliciaGuard]
})
export class AppRoutingModule { }
