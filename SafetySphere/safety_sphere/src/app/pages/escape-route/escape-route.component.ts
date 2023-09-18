import { Component, OnDestroy, OnInit } from '@angular/core';
import { NearbyPlacesService } from '../../@services/nearby-places.service'
import { AlarmService } from '../../@services/alarm.service'

@Component({
  selector: 'app-escape-route',
  templateUrl: './escape-route.component.html',
  styleUrls: ['./escape-route.component.scss']
})

export class EscapeRouteComponent implements OnInit, OnDestroy {
  // protected isEscaping: boolean = NearbyPlacesService.isEscaping

  constructor (private alarmService: AlarmService,
    private nearbyPlacesService :NearbyPlacesService
    
    ) {
  }
  ngOnInit() {
  }

  protected onStartEscape () {
    this.nearbyPlacesService.isEscaping = true
    // this.isEscaping = NearbyPlacesService.isEscaping
    this.nearbyPlacesService.onRestart()
  }

  ngOnDestroy() {
    this.nearbyPlacesService.isEscaping = false
    this.alarmService.destroy()
  }

  get isEscaping(){
    return this.nearbyPlacesService.isEscaping
  }
}