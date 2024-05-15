import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { InfractionFormComponent } from './components/infraction-form/infraction-form.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { PoliceHomeComponent } from './components/police-home/police-home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { JuezComponent } from './components/juez/juez.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoginRedirectGuard } from './guards/login-redirect.guard';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  { path: 'home', component: PoliceHomeComponent, canActivate: [AuthGuard] },
  { path: 'infraction', component: InfractionFormComponent, canActivate: [AuthGuard] },
  { path: 'historical', component: HistoricalComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'juez', component: JuezComponent, canActivate: [AuthGuard]},
  { path: 'car-detail/:id', component: CarDetailComponent, canActivate: [AuthGuard] },
  {path: 'admin', component: AdminComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' } // Redirigir cualquier ruta no reconocida a login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
