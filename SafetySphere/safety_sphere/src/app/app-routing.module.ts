import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentMapComponent } from './pages/incident-map/incident-map.component';
import { ReportIncidentComponent } from './pages/report-incident/report-incident.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  { path: 'incident-map', component: IncidentMapComponent },
  { path: 'report-incident', component: ReportIncidentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
