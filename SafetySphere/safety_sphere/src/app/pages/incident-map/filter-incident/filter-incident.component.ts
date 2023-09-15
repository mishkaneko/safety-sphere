import { Component } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'filter-incident',
  templateUrl: './filter-incident.component.html',
  styleUrls: ['./filter-incident.component.scss'],
})
export class FilterIncidentComponent {
  visible = false;
  radioValue = '全部';
  placement: NzDrawerPlacement = 'right';

  closeFilterDrawer(): void {
    this.visible = false;
  }
}
