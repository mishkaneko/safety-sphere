import { Component, EventEmitter, Output } from '@angular/core';
import { AlarmService } from '../../../@services/alarm.service'

@Component({
  selector: 'app-escape-route-start-button',
  templateUrl: './escape-route-start-button.component.html',
  styleUrls: ['./escape-route-start-button.component.scss']
})
export class EscapeRouteStartButtonComponent {
  @Output()
  onStartEscape = new EventEmitter();

  constructor (private alarmService: AlarmService) {}

  escape () {
    this.onStartEscape.emit()
  }

  alarm () {
    this.alarmService.loop()
  }
}
