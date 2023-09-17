import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component'

const routes: Routes = [
  // {
    // path: 'nav-menu',
    // loadChildren: () => import('../nav-menu/nav-menu.module').then(m => m.NavMenuModule),
    // path: '',
    // children: [
    //   {
    //     path: 'nav-menu',
    //     // path: '',
    //   }
    //   // {
    //   //   path: 'tab1',
    //   //   loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
    //   // },
    //   // {
    //   //   path: 'tab2',
    //   //   loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
    //   // },
    //   // {
    //   //   path: 'tab3',
    //   //   loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
    //   // },
    //   // {
    //   //   path: '',
    //   //   redirectTo: '/tabs/tab1',
    //   //   pathMatch: 'full'
    //   // }
    // ]
  // },
  // {
  //   path: '',
  //   redirectTo: '/tabs/tab1',
  //   pathMatch: 'full'
  // }
  {
    path: '',
    component: MainLayoutComponent,
    // redirectTo: 'nav-menu',
    // pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
