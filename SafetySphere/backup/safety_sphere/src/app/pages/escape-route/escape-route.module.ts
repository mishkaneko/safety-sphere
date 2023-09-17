import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscapeRouteComponent } from './escape-route.component'
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { EscapeRouteRoutingModule } from './escape-route-routing.module';
import { EscapeRouteMapModule } from './escape-route-map/escape-route-map.module'
import { EscapeRouteListModule } from './escape-route-list/escape-route-list.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { EscapeRouteStartButtonModule } from './escape-route-start-button/escape-route-start-button.module'

@NgModule({
  declarations: [
    EscapeRouteComponent
  ],
  imports: [
    CommonModule,
    NzSpinModule,
    EscapeRouteRoutingModule,
    EscapeRouteMapModule,
    EscapeRouteListModule,
    NzDividerModule,
    EscapeRouteStartButtonModule
  ],
  exports: [
    EscapeRouteComponent
  ],
  providers: [NzMessageService]
})
export class EscapeRouteModule { }