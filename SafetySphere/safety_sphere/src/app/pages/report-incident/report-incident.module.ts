import { ReportIncidentComponent } from './report-incident.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzImageModule } from 'ng-zorro-antd/image';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleSearchComponent } from './google-search/google-search.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportIncidentRoutingModule } from './report-incident-routing.module';
import { IncidentPhotoComponent } from './incident-photo/incident-photo.component';
import { HistoryService } from 'src/app/@services/history.service';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [
    ReportIncidentComponent,
    GoogleSearchComponent,
    IncidentPhotoComponent,
  ],
  imports: [
    CommonModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzImageModule,
    GoogleMapsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    ReportIncidentRoutingModule,
    FormsModule,
    NzListModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzNotificationModule 
  ],
  providers: [HistoryService],
  exports: [GoogleSearchComponent, IncidentPhotoComponent],
})
export class ReportIncidentModule {}
