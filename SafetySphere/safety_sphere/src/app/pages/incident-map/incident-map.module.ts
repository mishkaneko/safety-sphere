import { IncidentMapRoutingModule } from './incident-map-routing.module';
import { NgModule } from '@angular/core';

import { IncidentMapComponent } from './incident-map.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [IncidentMapRoutingModule, GoogleMapsModule],
  declarations: [IncidentMapComponent],
  exports: [IncidentMapComponent],
})
export class IncidentMapModule {}
