import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // selector: 'nz-demo-layout-responsive',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // isCollapsed = false;
  isCollapsed = true;
  tabs = [1, 2, 3, 4];
}
