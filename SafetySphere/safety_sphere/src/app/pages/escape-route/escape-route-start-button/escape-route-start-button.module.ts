import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { EscapeRouteStartButtonComponent } from './escape-route-start-button.component';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [EscapeRouteStartButtonComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule
  ],
  exports: [EscapeRouteStartButtonComponent]
})
export class EscapeRouteStartButtonModule { }
