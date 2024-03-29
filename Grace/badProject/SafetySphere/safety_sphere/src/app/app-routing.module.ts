import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'escape-route',
    loadChildren: () =>
      import('./pages/escape-route/escape-route.module').then(
        (m) => m.EscapeRouteModule
      ),
  },
  {
    path: 'incident-map',
    loadChildren: () =>
      import('./pages/incident-map/incident-map.module').then(
        (m) => m.IncidentMapModule
      ),
  },
  {
    path: 'report-incident',
    loadChildren: () =>
      import('./pages/report-incident/report-incident.module').then(
        (m) => m.ReportIncidentModule
      ),
  },
  {
    path: 'report-incident-history',
    loadChildren: () =>
      import(
        './pages/report-incident-history/report-incident-history.module'
      ).then((m) => m.ReportIncidentHistoryModule),
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
