import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  static currentPosition$ = new Subject<any>();
  private calculateCurrentPositionIntervalId!: any;

  constructor() {}

  async startCalculateCurrentPosition () {
    this.calculateCurrentPositionIntervalId = setInterval(async () => {
      // const position =  await Geolocation.getCurrentPosition()
      const position = await (async () => {
        try {
          return await Geolocation.getCurrentPosition()
        } catch (error) {
          return await Geolocation.getCurrentPosition()
        }
      })();
      this.setCurrentPosition(position.coords)
    }, 5000)
  }

  stopCalculateCurrentPosition () {
    clearInterval(this.calculateCurrentPositionIntervalId)
    // PositionService.currentPosition$.unsubscribe()
  }

  setCurrentPosition (coords:any) {
    PositionService.currentPosition$.next(coords);
  }

  // getCurrentPosition () {
  //   return this.currentPosition$.asObservable();
  // }
}
