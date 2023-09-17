import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu.component';



@NgModule({
  declarations: [NavMenuComponent],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class NavMenuModule { }
