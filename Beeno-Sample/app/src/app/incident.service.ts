import { Injectable } from '@angular/core';
import { IncidentListItem } from './incident-list-item';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  constructor(private api: ApiService) {}

  async getIncidentList() {
    // return [] as IncidentListItem[];
    let json = await this.api.get('/home/user-reports');
    return json as IncidentListItem[];
  }
}
