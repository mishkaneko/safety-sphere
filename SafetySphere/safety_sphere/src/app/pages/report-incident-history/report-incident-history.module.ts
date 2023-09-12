import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportIncidentHistoryRoutingModule } from './report-incident-history-routing.module';
import { ReportIncidentHistoryComponent } from './report-incident-history.component';
import { IncidentIdToTypePipe } from './incident-id-to-type.pipe';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { IncidentPhotoHistoryComponent } from './incident-photo-history/incident-photo-history.component';
import { EditIncidentComponent } from './edit-incident/edit-incident.component';
import { ReportIncidentModule } from '../report-incident/report-incident.module';

@NgModule({
  declarations: [
    ReportIncidentHistoryComponent,
    IncidentIdToTypePipe,
    IncidentPhotoHistoryComponent,
    EditIncidentComponent,
  ],
  imports: [
    CommonModule,
    ReportIncidentHistoryRoutingModule,
    NzListModule,
    NzDividerModule,
    NzImageModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTimePickerModule,
    ReportIncidentModule,
  ],
})
export class ReportIncidentHistoryModule {}
