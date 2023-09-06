import { UserProfileComponent } from './user-profile.component';
import { NgModule } from '@angular/core';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [NzFormModule, NzSelectModule, ReactiveFormsModule],
})
export class UserProfileModule {}
