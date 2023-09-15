import { Component, EventEmitter, Output } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'filter-incident',
  templateUrl: './filter-incident.component.html',
  styleUrls: ['./filter-incident.component.scss'],
})
export class FilterIncidentComponent {
  @Output() incidentTypeChange = new EventEmitter<string>();
  @Output() mapTypeChange = new EventEmitter<string>();

  visible = false;
  placement: NzDrawerPlacement = 'right';
  disabled = false;
  mapTypeRadioValue = 'showOriginal';
  incidentTypeRadioValue = 'all';

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
