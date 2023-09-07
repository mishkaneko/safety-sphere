import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  currentPosition = new Subject<any>();
  private calculateCurrentPositionIntervalId!: any;

  constructor() {}

  startCalculateCurrentPosition() {
    this.calculateCurrentPositionIntervalId = setInterval(async () => {
      const position = await Geolocation.getCurrentPosition();
      this.setCurrentPosition(position.coords);
    }, 5000);
  }

  stopCalculateCurrentPosition() {
    clearInterval(this.calculateCurrentPositionIntervalId);
  }

  setCurrentPosition(coords: any) {
    this.currentPosition.next(coords);
  }

  getCurrentPosition() {
    return this.currentPosition.asObservable();
  }
}
