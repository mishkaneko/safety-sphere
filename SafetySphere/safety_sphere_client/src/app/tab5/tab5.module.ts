import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab5Page } from './tab5.page';
// import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SideMenuModule } from './side-menu/side-menu.module'

import { Tab5PageRoutingModule } from './tab5-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // ExploreContainerComponentModule,
    SideMenuModule,
    Tab5PageRoutingModule
  ],
  declarations: [Tab5Page]
})
export class Tab5PageModule {}
