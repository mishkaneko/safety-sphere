import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationHistoryService {
  private _locationHistory: string = ''

  get locationHistory () {
    return this._locationHistory
  }
  
  set locationHistory (value) {
    this._locationHistory = value
  }
}
