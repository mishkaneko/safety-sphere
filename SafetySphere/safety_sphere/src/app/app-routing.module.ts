import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/escape-route' },

  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
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
    path: 'follow',
    loadChildren: () =>
      import('./pages/follow/follow.module').then((m) => m.FollowModule),
  },

  {
    path: 'ask-for-help',
    children: [
      {
        path: 'aaa@gmail.com',
        loadChildren: () =>
          import('./pages/ask-for-help/ask-for-help.module').then(
            (m) => m.AskForHelpModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
