import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module'
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

@NgModule({
  declarations: [MainLayoutComponent,NavMenuComponent],
  imports: [
    IonicModule,
    CommonModule,
    MainLayoutRoutingModule
  ],
  // bootstrap: [MainLayoutComponent]
})
export class MainLayoutModule { }
