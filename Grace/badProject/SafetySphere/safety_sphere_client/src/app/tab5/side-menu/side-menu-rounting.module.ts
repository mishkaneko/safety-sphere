import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: '/welcome' },
//   { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
// ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // RouterModule.forChild(routes)
  ],
  // exports: [RouterModule]
})
export class SideMenuRountingModule { }
