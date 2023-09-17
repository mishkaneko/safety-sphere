import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { EscapeRouteListComponent } from './escape-route-list.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    EscapeRouteListComponent
  ],
  imports: [
    CommonModule,
    NzListModule,
    NzSkeletonModule,
    NzDividerModule,
    NzButtonModule
  ],
  exports: [EscapeRouteListComponent]
})
export class EscapeRouteListModule { }
