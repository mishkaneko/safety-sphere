import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentListPage } from './incident-list.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentListPageRoutingModule {}
