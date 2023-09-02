import { ReportIncidentComponent } from './report-incident.component';
import { NgModule } from '@angular/core';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  imports: [NzFormModule, NzSelectModule],
  declarations: [ReportIncidentComponent],
  exports: [ReportIncidentComponent],
})
export class ReportIncidentModule {}
