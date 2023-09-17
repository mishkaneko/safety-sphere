import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportIncidentHistoryRoutingModule } from './report-incident-history-routing.module';
import { ReportIncidentHistoryComponent } from './report-incident-history.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { ReportIncidentModule } from '../report-incident/report-incident.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { EditIncidentComponent } from './edit-incident/edit-incident.component';
import { IncidentPhotoHistoryComponent } from './incident-photo-history/incident-photo-history.component';
import { DateAndTimeFormatPipe } from 'src/app/pages/report-incident-history/date-and-time-format.pipe';
import { HistoryService } from 'src/app/@services/history.service';

@NgModule({
  declarations: [
    ReportIncidentHistoryComponent,
    EditIncidentComponent,
    IncidentPhotoHistoryComponent,
    DateAndTimeFormatPipe,
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
    NzSpinModule,
  ],
  providers: [HistoryService],
})
export class ReportIncidentHistoryModule {}
