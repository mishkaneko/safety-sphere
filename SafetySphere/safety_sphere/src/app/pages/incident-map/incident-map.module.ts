import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentMapRoutingModule } from './incident-map-routing.module';
import { IncidentMapComponent } from './incident-map.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  imports: [CommonModule, NzSpinModule, IncidentMapRoutingModule],
  declarations: [IncidentMapComponent],
  exports: [IncidentMapComponent],
})
export class IncidentMapModule {}
