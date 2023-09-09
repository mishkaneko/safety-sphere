import { Component, inject } from '@angular/core';
import { ApiService } from 'src/app/@services/api.service';

interface ReportRecordList {
  incident_id: number;
  date: string;
  time: string;
  location: string;
  description: string;
  images: string[];
}

@Component({
  selector: 'app-report-incident-history',
  templateUrl: './report-incident-history.component.html',
  styleUrls: ['./report-incident-history.component.scss'],
})
export class ReportIncidentHistoryComponent {
  reportRecordList: ReportRecordList[] = [];

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService
      .getDataFromServer('/report-incident-history/report-record')
      .subscribe({
        next: (data: any) => {
          console.log('component:', data);
          this.reportRecordList = data;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
      });
  }
}
