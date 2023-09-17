import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NearbyPlacesService {
  constructor() { }

  static isEscaping: boolean = false

  static map: google.maps.Map | null

  static places: { selected: boolean, place: google.maps.places.PlaceResult, marker: any, infoWindow: any }[] = []

  // static routeOrigin: { place_id: string, lat: number, lng: number } = { place_id: '', lat: 0, lng: 0 }

  // static routeDestination: { place_id: string, lat: number, lng: number } = { place_id: '', lat: 0, lng: 0 }
  static destination: { place_id: string, lat: number, lng: number } = { place_id: '', lat: 0, lng: 0 }

  static escapeRoute: { route: any, polyLines: google.maps.Polyline[] } = { route: null, polyLines: [] }

  static placesService: google.maps.places.PlacesService | null

  static userMarker: google.maps.Marker | null

  static userLatLng: { lat:number | null, lng:number | null } = { lat: null, lng: null }

  static nearbyPlaces$ = new Subject();

  static restart$ = new Subject();

  directionsService = new google.maps.DirectionsService();

  // 執行地點搜索
  async searchNearbyPlaces () {
    const types = [
      'convenience_store', 'fire_station', 'gas_station', 'hospital', 'police', 'subway_station', 'train_station'
    ]

    // 使用Google Maps Places API等進行地點搜索
    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(NearbyPlacesService.userLatLng.lat as number, NearbyPlacesService.userLatLng.lng as number),
      // radius: 5000, // Search within a 5000-meter radius
      // type: 'convenience_store', // Search for convenience_store
      openNow: true, // Only show places that are currently open
      rankBy: google.maps.places.RankBy.DISTANCE  // Specifies the ranking method to use when returning results. Note that when rankBy is set to DISTANCE, you must specify a location but you cannot specify a radius or bounds.
    };

    await Promise.all(types.map(async type => {
      await new Promise<void>(resolve => {
        request.type = type
        NearbyPlacesService.placesService!.nearbySearch(request, (results: any, status: google.maps.places.PlacesServiceStatus) => {
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

  calculateRoute (destination:google.maps.LatLng) {
    const request = {
      origin: new google.maps.LatLng(NearbyPlacesService.userLatLng.lat as number, NearbyPlacesService.userLatLng.lng as number),
      destination,
      travelMode: google.maps.TravelMode.WALKING
    };

    this.directionsService.route(request, (result:any, status:any) => {
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
    NearbyPlacesService.placesService = null
    NearbyPlacesService.userMarker = null
    NearbyPlacesService.userLatLng = { lat: null, lng: null }
  }
}
