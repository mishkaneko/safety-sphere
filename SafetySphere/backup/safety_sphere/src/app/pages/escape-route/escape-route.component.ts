import { Component, OnInit } from '@angular/core';
import { NearbyPlacesService } from '../../@services/nearby-places.service'
import { AlarmService } from '../../@services/alarm.service'

@Component({
  selector: 'app-escape-route',
  templateUrl: './escape-route.component.html',
  styleUrls: ['./escape-route.component.scss']
})

export class EscapeRouteComponent implements OnInit {
  protected NearbyPlacesService = NearbyPlacesService
  protected nearbyPlacesService!: NearbyPlacesService
  // protected isEscaping: boolean = NearbyPlacesService.isEscaping

  constructor (private alarmService: AlarmService) {
    this.nearbyPlacesService = new NearbyPlacesService()
  }
  ngOnInit() {
    this.alarmService.init()
  }

  protected onStartEscape () {
    NearbyPlacesService.isEscaping = true
    // this.isEscaping = NearbyPlacesService.isEscaping
    this.nearbyPlacesService.onRestart()
  }
}