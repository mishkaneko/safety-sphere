import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscapeRouteComponent } from './escape-route.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { EscapeRouteRoutingModule } from './escape-route-routing.module';

@NgModule({
  declarations: [EscapeRouteComponent],
  imports: [CommonModule, NzSpinModule, EscapeRouteRoutingModule],
  exports: [EscapeRouteComponent],
})
export class EscapeRouteModule {}
