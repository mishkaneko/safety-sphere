import { createDefer } from '@beenotung/tslib/async/defer';
import { GoogleMapService } from './../google-map.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NearbyPlacesService {
  constructor(private googleMapService:GoogleMapService) { }

  // static isEscaping: boolean = false
  isEscaping: boolean = false
  // get isEscaping(){return NearbyPlacesService.isEscaping}
  // set isEscaping(value:boolean){NearbyPlacesService.isEscaping=value}

  static map: google.maps.Map | null

  static places: { selected: boolean, place: google.maps.places.PlaceResult, marker: any, infoWindow: any }[] = []

  // static routeOrigin: { place_id: string, lat: number, lng: number } = { place_id: '', lat: 0, lng: 0 }

  // static routeDestination: { place_id: string, lat: number, lng: number } = { place_id: '', lat: 0, lng: 0 }
  static destination: { place_id: string, lat: number, lng: number } = { place_id: '', lat: 0, lng: 0 }

  static escapeRoute: { route: any, polyLines: google.maps.Polyline[] } = { route: null, polyLines: [] }

  static placesService=
  createDefer<google.maps.places.PlacesService>()

  static userMarker: google.maps.Marker | null

  static userLatLng = createDefer<{ lat:number , lng:number }>()
  static setUserLatLng(pos: { lat:number , lng:number }) {
    this.userLatLng.resolve(pos)
    this.userLatLng.promise.then(x=>Object.assign(x,pos))
  }


  static nearbyPlaces$ = new Subject();

  static restart$ = new Subject();

  directionsServicePromise = this.googleMapService.googleDefer.promise.then(google=> new google.maps.DirectionsService())

  // 執行地點搜索
  async searchNearbyPlaces () {
    let google = await this.googleMapService.googleDefer.promise
    let placesService = await NearbyPlacesService.placesService.promise

    const types = [
      'convenience_store', 'fire_station', 'gas_station', 'hospital', 'police', 'subway_station', 'train_station'
    ]

    

    await Promise.all(types.map(async type => {
      let userLatLng = await NearbyPlacesService.userLatLng.promise
      await new Promise<void>(resolve => {
      // 使用Google Maps Places API等進行地點搜索
      const request: google.maps.places.PlaceSearchRequest = {
          type,
        location: new google.maps.LatLng(userLatLng.lat , userLatLng.lng),
        // radius: 5000, // Search within a 5000-meter radius
        // type: 'convenience_store', // Search for convenience_store
        openNow: true, // Only show places that are currently open
        rankBy: google.maps.places.RankBy.DISTANCE  // Specifies the ranking method to use when returning results. Note that when rankBy is set to DISTANCE, you must specify a location but you cannot specify a radius or bounds.
      };

        placesService.nearbySearch(request, (results: any, status: google.maps.places.PlacesServiceStatus) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // const destinationLatLng = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }
            // const destination = new google.maps.LatLng(destinationLatLng.lat, destinationLatLng.lng)
            // Object.assign(NearbyPlacesService.destination, { place_id: results[0].place_id, lat: destinationLatLng.lat, lng: destinationLatLng.lng })
            // NearbyPlacesService.nearbyPlaces$.next({ nearbyPlaces: results, origin })
            this.displaySearchResults(results, resolve)
            // this.calculateRoute(origin, destination)
          } else {
            resolve()
          }
        });
      })

      return type
    }))

    NearbyPlacesService.nearbyPlaces$.next(null)
  }

  private displaySearchResults (results: google.maps.places.PlaceResult[], resolve: any) {
    for (const place of results) {
      let photoUrl:string = ''
      if (place.photos) {
        place.photos[0].width = 130;
        photoUrl = place.photos[0].getUrl()
      }
      // const marker = new google.maps.Marker({
      const marker = {
        position: place.geometry?.location,
        map: NearbyPlacesService.map,
        title: place.name,
      };
      // const infoWindow = new google.maps.InfoWindow({
      const infoWindow = {
        content: `
          <div style="display: flex; width: 100%;">
            <div>
              <h2>${place.name}</h2>
              <strong>${place.vicinity}</strong>
            </div>
            
            <div>
              <img src="${photoUrl}" alt="圖片無法顯示" loading="lazy">
            </div>
          </div>
        `
      };
      NearbyPlacesService.places.push({ selected: false, place, marker, infoWindow })
      // 在點擊標記時顯示信息窗口
      // marker.addListener('click', () => {
      //   infoWindow.open(NearbyPlacesService.map, marker);
      // });
    }

    resolve()
  }

  async calculateRoute (destination:google.maps.LatLng) {
    let google = await this.googleMapService.googleDefer.promise
    let userLatLng = await NearbyPlacesService.userLatLng.promise
    const request = {
      origin: new google.maps.LatLng(userLatLng.lat, userLatLng.lng),
      destination,
      travelMode: google.maps.TravelMode.WALKING
    };

    let directionsService = await this.directionsServicePromise
    directionsService.route(request, (result:any, status:any) => {
      if (status === 'OK') {
        NearbyPlacesService.escapeRoute.route = result.routes[0]
        if (NearbyPlacesService.escapeRoute.polyLines) NearbyPlacesService.escapeRoute.polyLines.length = 0
        for (const step of result.routes[0].legs[0].steps) {
          NearbyPlacesService.escapeRoute.polyLines.push(
            new google.maps.Polyline({
              map: NearbyPlacesService.map,
              path: [
                { lat: step.start_point.lat(), lng: step.start_point.lng() },
                { lat: step.end_point.lat(), lng: step.end_point.lng() },
              ],
              icons: [{
                icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
                offset: '100%'
              }],
            })
          )

          // if (i === 0) {
          //   new google.maps.Marker({
          //     position: new google.maps.LatLng(step.start_point.lat(), step.start_point.lng()),
          //     map: this.map,
          //     title: 'Start point',
          //     icon: {
          //       url: 'https://cdn-icons-png.flaticon.com/512/1768/1768113.png',
          //       // path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          //       scaledSize: new google.maps.Size(50, 50),
          //       // scale: 5
          //     }
          //   });
          // }

          // if (i === result.routes[0].legs[0].steps.length - 1) {
          //   new google.maps.Marker({
          //     position: new google.maps.LatLng(step.end_point.lat(), step.end_point.lng()),
          //     map: this.map,
          //     title: 'End point',
          //     // animation: google.maps.Animation.BOUNCE,
          //     icon: {
          //       url: 'https://cdn-icons-png.flaticon.com/512/1768/1768178.png',
          //       // path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          //       scaledSize: new google.maps.Size(50, 50),
          //       // scale: 5
          //     }
          //   });
          // }
        }
      } else {
        console.error('Directions error', status);
      }
    });
  }

  onRestart () {
    this.onReset()
    NearbyPlacesService.restart$.next(null)
  }

  onReset () {
    NearbyPlacesService.map = null
    NearbyPlacesService.places.length = 0
    NearbyPlacesService.destination = { place_id: '', lat: 0, lng: 0 }
    NearbyPlacesService.escapeRoute = { route: null, polyLines: [] }
    // NearbyPlacesService.placesService = null // TODO check if need to reset this
    NearbyPlacesService.userMarker = null
    // NearbyPlacesService.userLatLng = null // TODO check if need to reset this
  }
}