import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // selector: 'nz-demo-layout-responsive',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = true;

  constructor() {
    console.log('app');
  }

  closeSideMenu = () => {
    this.isCollapsed = true;
  };

  // title = 'safety_sphere';
}
