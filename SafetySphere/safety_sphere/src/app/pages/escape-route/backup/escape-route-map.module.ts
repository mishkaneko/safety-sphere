import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscapeRouteMapComponent } from './escape-route-map.component'
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [
    EscapeRouteMapComponent,
  ],
  imports: [
    CommonModule,
    NzSpinModule
  ],
  exports: [
    EscapeRouteMapComponent
  ]
})
export class EscapeRouteMapModule { }