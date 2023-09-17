import { NgModule } from '@angular/core';

import { IncidentMapComponent } from './incident-map.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [GoogleMapsModule],
  declarations: [IncidentMapComponent],
  exports: [IncidentMapComponent],
})
export class IncidentMapModule {}
