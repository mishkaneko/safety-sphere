import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/@services/api.service';

interface ReportRecordList {
  id: number;
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

  constructor(private apiService: ApiService, private router: Router) {}
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

  editIncident(recordId: number) {
    this.router.navigate(['/report-incident-history/edit-incident', recordId]);
  }
}
