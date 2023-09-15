import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [
    UserProfileRoutingModule,
    NzSelectModule,
    FormsModule,
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
  ],
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent],
})
export class UserProfileModule {
  constructor() {}
}
