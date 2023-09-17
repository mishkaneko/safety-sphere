import { Component } from '@angular/core';
import { NearbyPlacesService } from 'src/app/@services/nearby-places.service'
// import { CurrentRoutePathService } from './@services/current-route-path.service'
import { AlarmService } from './@services/alarm.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected isCollapsed = true;
  private nearbyPlacesService: NearbyPlacesService
  protected NearbyPlacesService = NearbyPlacesService

  constructor (private alarmService: AlarmService) {
    this.nearbyPlacesService = new NearbyPlacesService()
  }

  protected onRestart () {
    this.nearbyPlacesService.onRestart()
  }

  protected onStopEscape () {
    this.alarmService.stop()
    NearbyPlacesService.isEscaping = false
    this.nearbyPlacesService.onRestart()
  }

  protected iconSoundColor () {
    return this.alarmService.isAlarming ? '#f74d4f' : '#9e9e9e'
  }

  protected onSwitchAlarm () {
    return this.alarmService.isAlarming ? this.alarmService.stop() : this.alarmService.loop()
  }
}
