import { Component, OnInit } from '@angular/core';
import { IncidentListItem } from '../incident-list-item';
import { IncidentService } from '../incident.service';
import { HomeService } from 'src/api/home/home.service';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.page.html',
  styleUrls: ['./incident-list.page.scss'],
})
export class IncidentListPage implements OnInit {
  items: IncidentListItem[] = [];

  constructor(
    private incidentService: IncidentService,
    private homeService: HomeService
  ) {}

  async ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.items.push({
        id: Math.random(),
        title: Math.random().toString(36).slice(2),
        desc:
          Math.random().toString(36).slice(2) +
          Math.random().toString(36).slice(2) +
          Math.random().toString(36).slice(2),
      });
    }
    await this.loadIncidentList();
  }

  async loadIncidentList() {
    this.items = await this.incidentService.getIncidentList();
    let json = await this.homeService.getUserReports();
    console.log(json);
  }
}
