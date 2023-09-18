import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { IncidentMapService } from 'src/app/@services/incident-map.service';

@Component({
  selector: 'filter-incident',
  templateUrl: './filter-incident.component.html',
  styleUrls: ['./filter-incident.component.scss'],
})
export class FilterIncidentComponent {
  @Output() incidentTypeChange = new EventEmitter<string>();
  @Output() mapTypeChange = new EventEmitter<string>();

  visible = false;
  placement: NzDrawerPlacement = 'bottom';
  disabled = false;
  mapTypeRadioValue = 'showOriginal';
  incidentTypeRadioValue = 'all';

  constructor(private incidentMapService: IncidentMapService) {}

  closeFilterDrawer(): void {
    this.visible = false;
  }

  onIncidentTypeChange() {
    this.incidentTypeChange.emit(this.incidentTypeRadioValue);
  }

  onMapTypeChange() {
    this.mapTypeChange.emit(this.mapTypeRadioValue);
  }
}
