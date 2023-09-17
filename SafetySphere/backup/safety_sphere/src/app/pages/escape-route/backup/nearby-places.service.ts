import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NearbyPlacesService {
  constructor() { }

  nearbyPlaces$ = new Subject<{ nearbyPlaces: google.maps.places.PlaceResult[], origin: google.maps.LatLng }>();

  calculateAnotherRoute$ = new Subject<any>()

  directionsService = new google.maps.DirectionsService();

  location = {

  }

  private _places: { place: any, marker: any, infoWindow: any }[] = []
  get places () {
    return this._places
  }
  set places (newPlaces) {
    this._places = newPlaces
  }

  private _origin: { place: any, lat: any, lng: any } = { place: null, lat: null, lng: null }
  get origin () {
    return this._origin
  }
  set origin (newOrigin) {
    Object.assign(this.origin, newOrigin)
  }

  private _destination: { place: any, lat: any, lng: any } = { place: null, lat: null, lng: null }
  get destination () {
    return this._destination
  }
  set destination (newDestination) {
    Object.assign(this.origin, newDestination)
  }
}
