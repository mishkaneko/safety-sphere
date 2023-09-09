import { NgModule } from '@angular/core';
import { ReportIncidentHistoryComponent } from './report-incident-history.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ReportIncidentHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportIncidentHistoryRoutingModule {}
