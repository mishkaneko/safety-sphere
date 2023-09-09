import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportIncidentHistoryRoutingModule } from './report-incident-history-routing.module';
import { ReportIncidentHistoryComponent } from './report-incident-history.component';
import { IncidentIdToTypePipe } from './incident-id-to-type.pipe';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';
import { IncidentPhotoHistoryComponent } from './incident-photo-history/incident-photo-history.component';

@NgModule({
  declarations: [
    ReportIncidentHistoryComponent,
    IncidentIdToTypePipe,
    IncidentPhotoHistoryComponent,
  ],
  imports: [
    CommonModule,
    ReportIncidentHistoryRoutingModule,
    NzListModule,
    NzDividerModule,
    NzImageModule,
  ],
})
export class ReportIncidentHistoryModule {}
