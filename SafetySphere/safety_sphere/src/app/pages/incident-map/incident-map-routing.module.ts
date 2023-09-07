import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IncidentMapComponent } from './incident-map.component';

const routes: Routes = [{ path: '', component: IncidentMapComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentMapRoutingModule {}
