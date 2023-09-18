import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AskForHelpComponent } from './ask-for-help.component';

const routes: Routes = [
  { path: '', component: AskForHelpComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AskForHelpRoutingModule { }
