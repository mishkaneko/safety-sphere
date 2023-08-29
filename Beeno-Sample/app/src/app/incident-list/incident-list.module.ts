import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentListPageRoutingModule } from './incident-list-routing.module';

import { IncidentListPage } from './incident-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentListPageRoutingModule
  ],
  declarations: [IncidentListPage]
})
export class IncidentListPageModule {}
