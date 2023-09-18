import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { FollowComponent } from './follow.component'
import { FollowRoutingModule } from './follow-routing.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [FollowComponent],
  imports: [
    CommonModule,
    NzListModule,
    FollowRoutingModule,
    NzInputModule,
    NzIconModule,
    FormsModule,
    NzNotificationModule,
    NzModalModule
  ],
  exports: [FollowComponent]
})
export class FollowModule { }
