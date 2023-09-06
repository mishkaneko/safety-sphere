import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentMapComponent } from './incident-map.component';

const routes: Routes = [{ path: '', component: IncidentMapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentMapRoutingModule {}
