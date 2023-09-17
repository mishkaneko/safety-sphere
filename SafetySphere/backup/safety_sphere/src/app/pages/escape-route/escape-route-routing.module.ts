import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EscapeRouteComponent } from './escape-route.component'
// import { EscapeRouteMapComponent } from './escape-route-map/escape-route-map.component'

const routes: Routes = [
  { path: '', component: EscapeRouteComponent }
  // { path: '', component: EscapeRouteMapComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EscapeRouteRoutingModule { }
