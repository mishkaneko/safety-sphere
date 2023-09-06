import { ReportIncidentComponent } from './report-incident.component';
import { NgModule } from '@angular/core';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleSearchComponent } from './google-search/google-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportIncidentRoutingModule } from './report-incident-routing.module';

@NgModule({
  imports: [
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTimePickerModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    ReportIncidentRoutingModule,
  ],
  declarations: [ReportIncidentComponent, GoogleSearchComponent],
  exports: [ReportIncidentComponent],
})
export class ReportIncidentModule {}
