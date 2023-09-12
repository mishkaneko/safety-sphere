import { NgModule } from '@angular/core';
import { ReportIncidentHistoryComponent } from './report-incident-history.component';
import { RouterModule, Routes } from '@angular/router';
import { EditIncidentComponent } from './edit-incident/edit-incident.component';

const routes: Routes = [
  { path: '', component: ReportIncidentHistoryComponent },
  { path: 'edit-incident/:id', component: EditIncidentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportIncidentHistoryRoutingModule {}
