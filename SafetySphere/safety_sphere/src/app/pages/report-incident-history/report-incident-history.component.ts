import { HistoryService } from 'src/app/@services/history.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/@services/api.service';

interface ReportRecordList {
  id: number;
  incident: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image_array: any[];
}

@Component({
  selector: 'app-report-incident-history',
  templateUrl: './report-incident-history.component.html',
  styleUrls: ['./report-incident-history.component.scss'],
})
export class ReportIncidentHistoryComponent {
  protected HistoryService = HistoryService;
  reportRecordList: ReportRecordList[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {

    HistoryService.showReportIncidentHistoryTitle = true;

    this.apiService.get('/report-incident-history/report-record').subscribe({
      next: (data: any) => {
        console.log('component:', data);
        this.reportRecordList = data;
        console.log('reportRecordList: ', this.reportRecordList);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  editIncident(recordId: number) {
    this.router.navigate(['/report-incident-history/edit-incident', recordId]);
  }

  ngOnDestroy() {
    HistoryService.showReportIncidentHistoryTitle = false;
  }
}
