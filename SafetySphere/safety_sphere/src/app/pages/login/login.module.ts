import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginComponent } from './login.component'
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
// import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzGridModule
    // NzCheckboxModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
