import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-layout',
    pathMatch: 'full'
  },
  {
    path: 'main-layout',
    loadChildren: () => import('./main-layout/main-layout.module').then(m => m.MainLayoutModule)
  }
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  // {
  //   path: 'a',
  //   loadChildren: () => import('./a/a.module').then( m => m.APageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
