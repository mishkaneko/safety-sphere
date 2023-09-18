import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskForHelpComponent } from './ask-for-help.component'
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AskForHelpRoutingModule } from './ask-for-help-routing.module';


@NgModule({
  declarations: [AskForHelpComponent],
  imports: [
    CommonModule,
    NzSpinModule,
    AskForHelpRoutingModule
  ],
  exports: [AskForHelpComponent]
})
export class AskForHelpModule { }
