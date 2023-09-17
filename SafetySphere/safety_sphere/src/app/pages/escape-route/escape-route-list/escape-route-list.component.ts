import { Component, OnDestroy, OnInit } from '@angular/core';
import { NearbyPlacesService } from '../../../@services/nearby-places.service'
import { Subscription } from 'rxjs';
import { PositionService } from 'src/app/@services/position.service';

@Component({
  selector: 'app-escape-route-list',
  templateUrl: './escape-route-list.component.html',
  styleUrls: ['./escape-route-list.component.scss']
})

export class EscapeRouteListComponent implements OnInit, OnDestroy {
  protected initLoading = true; // bug
  private nearbyPlacesSubscription?: Subscription
  private currentPositionSubscription?: Subscription
  // protected nearbyPlaces: Array<google.maps.places.PlaceResult & {distance:google.maps.Distance, duration:google.maps.Duration}> = []
  protected nearbyPlaces: any[] = []
  protected nearbyPlacesService!: NearbyPlacesService
  private placeSelectedCollection: {
    selected: boolean;
    place: google.maps.places.PlaceResult;
    marker: google.maps.Marker;
    infoWindow: google.maps.InfoWindow;
    distance?: { text: string, value: number },
    duration?: { text: string, value: number }
} | null = null
  private restartSubscription?: Subscription

  // constructor(private nearbyPlacesService: NearbyPlacesService) {}
  constructor() {
    this.nearbyPlacesService = new NearbyPlacesService()
  }

  ngOnInit() {
    this.nearbyPlacesSubscription = NearbyPlacesService.nearbyPlaces$.subscribe(async () => {
      await this.rankDurationToPlace(NearbyPlacesService.places)
      this.nearbyPlaces.length = 5
      this.nearbyPlaces.map(placeCollection => {
        Object.assign(placeCollection, {
          marker: new google.maps.Marker(placeCollection.marker),
          infoWindow: new google.maps.InfoWindow(placeCollection.infoWindow)
        })
        placeCollection.marker.addListener('click', () => {
          placeCollection.infoWindow.open(NearbyPlacesService.map, placeCollection.marker);
        });
        return placeCollection
      })
      const destinationLatLng = { lat: this.nearbyPlaces[0].place.geometry.location.lat(), lng: this.nearbyPlaces[0].place.geometry.location.lng() }   
      const destination = new google.maps.LatLng(destinationLatLng.lat, destinationLatLng.lng)
      this.updatePlaceCollection(this.nearbyPlaces[0])
      Object.assign(NearbyPlacesService.destination, { place_id: this.nearbyPlaces[0].place_id, lat: destinationLatLng.lat, lng: destinationLatLng.lng })
      this.nearbyPlacesService.calculateRoute(destination)
      this.initLoading = false
    })

    this.currentPositionSubscription = PositionService.currentPosition$.subscribe(async () => {
      await this.rankDurationToPlace(this.nearbyPlaces)
    })

    this.restartSubscription = NearbyPlacesService.restart$.subscribe(async () => {
      this.onReset()
    })
  }

  reformPlaceType (text:string) {
    return text.replace(/_/g, ' ')
  }

  protected isThePlaceSelected (place_id:string) {
    return place_id === this.placeSelectedCollection?.place.place_id
  }

  protected switchPlace (placeCollection: any) {
    if (placeCollection.place.place_id === this.placeSelectedCollection?.place.place_id) return
    NearbyPlacesService.escapeRoute.route = null
    for (const polyline of NearbyPlacesService.escapeRoute.polyLines) {
      polyline.setMap(null);
    }
    this.updatePlaceCollection(placeCollection)
    this.nearbyPlacesService.calculateRoute(
      new google.maps.LatLng(placeCollection.place.geometry.location.lat(), placeCollection.place.geometry.location.lng())
    )
  }

  private updatePlaceCollection (placeCollection: any) {
    if (this.placeSelectedCollection) {
      this.placeSelectedCollection!.selected = false
      // this.placeSelectedCollection?.infoWindow.close()
      this.placeSelectedCollection?.marker.setAnimation(null)
      this.placeSelectedCollection?.marker.setIcon('')
    }
    this.placeSelectedCollection = NearbyPlacesService.places.find(elem => elem.place.place_id === placeCollection.place.place_id) as any
    this.placeSelectedCollection!.selected = true
    // this.placeSelectedCollection!.infoWindow.open(NearbyPlacesService.map, this.placeSelectedCollection!.marker)
    this.placeSelectedCollection?.marker.setAnimation(google.maps.Animation.BOUNCE)
    this.placeSelectedCollection?.marker.setIcon({
      url: 'https://cdn-icons-png.flaticon.com/512/1604/1604189.png',
      scaledSize: new google.maps.Size(40, 40)
    })

    NearbyPlacesService.map!.panTo(
      new google.maps.LatLng(NearbyPlacesService.userLatLng.lat as number, NearbyPlacesService.userLatLng.lng as number)
    )
  }

  private async rankDurationToPlace (places: any[]) {
    const nearbyPlaces: any[] = []
    // await Promise.all(NearbyPlacesService.places.map(async placeCollection => {
    await Promise.all(places.map(async placeCollection => {
      const request = {
        origin: new google.maps.LatLng(NearbyPlacesService.userLatLng.lat as number, NearbyPlacesService.userLatLng.lng as number),
        destination: new google.maps.LatLng(
          placeCollection.place.geometry?.location?.lat() as number, placeCollection.place.geometry?.location?.lng() as number
        ),
        travelMode: google.maps.TravelMode.WALKING
      };
      const directionsResult = await this.nearbyPlacesService.directionsService.route(request)
      const { distance, duration } = directionsResult.routes[0].legs[0]
      // this.nearbyPlaces.push(Object.assign(placeCollection, { distance , duration}))
      nearbyPlaces.push(Object.assign(placeCollection, { distance , duration}))
      // this.nearbyPlaces.sort((x:any, y:any) => x.duration.value - y.duration.value)
      nearbyPlaces.sort((x:any, y:any) => x.duration.value - y.duration.value)
    }))
    this.nearbyPlaces.splice(0, this.nearbyPlaces.length, ...nearbyPlaces)
  }

  private onReset () {
    this.initLoading = true
    this.nearbyPlaces.length = 0
    this.placeSelectedCollection = null
  }

  ngOnDestroy() {
    this.nearbyPlacesSubscription?.unsubscribe()
    this.currentPositionSubscription?.unsubscribe()
    this.restartSubscription?.unsubscribe()
    this.nearbyPlacesService.onReset()
  }
}
