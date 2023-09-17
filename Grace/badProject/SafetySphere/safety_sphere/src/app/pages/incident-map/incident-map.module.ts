import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentMapRoutingModule } from './incident-map-routing.module';
import { IncidentMapComponent } from './incident-map.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { FilterIncidentComponent } from './filter-incident/filter-incident.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NzSpinModule,
    IncidentMapRoutingModule,
    NzDrawerModule,
    NzButtonModule,
    NzRadioModule,
    FormsModule,
  ],
  declarations: [IncidentMapComponent, FilterIncidentComponent],
  exports: [IncidentMapComponent],
})
export class IncidentMapModule {}
