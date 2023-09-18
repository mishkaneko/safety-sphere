import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private _locationHistory: string = ''
  private _imageHistory: any 
  static showReportIncidentHistoryTitle: boolean = false;
  static showEditIncidentTitle: boolean = false;

  get locationHistory () {
    return this._locationHistory
  }
  
  set locationHistory (value) {
    this._locationHistory = value
  }

  get imageHistory () {
    return this._imageHistory
  }
  
  set imageHistory (value) {
    this._imageHistory = value
  }
}
