import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentMapPage } from './incident-map.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentMapPageRoutingModule {}
