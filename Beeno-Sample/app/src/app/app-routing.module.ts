import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'incident-list',
    loadChildren: () =>
      import('./incident-list/incident-list.module').then(
        (m) => m.IncidentListPageModule
      ),
  },
  {
    path: 'incident-map/:id',
    loadChildren: () =>
      import('./incident-map/incident-map.module').then(
        (m) => m.IncidentMapPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
