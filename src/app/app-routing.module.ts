import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { InfractionFormComponent } from './components/infraction-form/infraction-form.component';
import { HistoricalComponent } from './components/historical/historical.component';

// Implementar un guard para controlar el acceso a las rutas
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'infraction', component: InfractionFormComponent, canActivate: [AuthGuard] },
  { path: 'historical', component: HistoricalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
