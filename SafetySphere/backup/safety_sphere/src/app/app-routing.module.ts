import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentMapComponent } from './pages/incident-map/incident-map.component';
import { ReportIncidentComponent } from './pages/report-incident/report-incident.component';
import { LoginComponent } from './pages/login/login.component'
// import { EscapeRouteComponent } from './pages/escape-route/escape-route.component'
// import { EscapeRoute2Component } from './pages/escape-route2/escape-route2.component'

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: '', pathMatch: 'full', redirectTo: '/escape-route' },
  // {
  //   path: 'welcome',
  //   loadChildren: () =>
  //     import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  // },
  {
    path: 'escape-route',
    loadChildren: () =>
      import('./pages/escape-route/escape-route.module').then((m) => m.EscapeRouteModule),
  },
  { path: 'login', component: LoginComponent },
  // { path: 'escape-route', component: EscapeRouteComponent },
  { path: 'incident-map', component: IncidentMapComponent },
  { path: 'report-incident', component: ReportIncidentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
