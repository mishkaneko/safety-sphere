import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
// import { CurrentRoutePathService } from '../../@services/current-route-path.service'
import { PositionService } from '../../@services/position.service';

declare const google: any;

interface LatLng {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-escape-route',
  templateUrl: './escape-route.component.html',
  styleUrls: ['./escape-route.component.scss'],
})
export class EscapeRouteComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapDiv') mapDiv!: ElementRef;
  @ViewChild('locateButtonContainer') locateButtonContainer!: ElementRef;
  @ViewChild('locateButton') locateButton!: ElementRef;

  private map: any;
  private placesService: any;
  protected isViewInited: boolean = false;
  private oldUserLatLng: LatLng = { lat: 0, lng: 0 };
  private userMarker: any;
  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
  });
  // private directionsRenderer = new google.maps.DirectionsRenderer();

  constructor(private positionService: PositionService) {}

  async ngAfterViewInit() {
    const { coords } = await Geolocation.getCurrentPosition();
    console.log('coords');
    console.log(coords);
    this.initMap({ lat: coords.latitude, lng: coords.longitude });

    this.positionService.startCalculateCurrentPosition();

    // 更新user定位
    this.positionService.getCurrentPosition().subscribe((coords) => {
      this.updateUserMarker({ lat: coords.latitude, lng: coords.longitude });
    });

    // 創建定位按鈕
    this.createLocateButton();

    // 執行地點搜索
    this.searchNearbyPlaces();
  }

  ngOnDestroy() {
    this.positionService.stopCalculateCurrentPosition();
  }

  // 創建定位按鈕
  private createLocateButton() {
    const locateButtonDiv: any = this.locateButtonContainer.nativeElement;
    const locateButton: any = this.locateButton.nativeElement;
    locateButton.addEventListener('click', () => {
      // 移動地圖中心到定位位置
      const latLng = new google.maps.LatLng(
        this.oldUserLatLng.lat,
        this.oldUserLatLng.lng
      );
      this.map.panTo(latLng);
    });
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
      locateButtonDiv
    );
    this.isViewInited = true;
  }

  private updateUserMarker(newUserLatLng: { lat: number; lng: number }) {
    if (
      newUserLatLng.lat === this.oldUserLatLng.lat &&
      newUserLatLng.lng === this.oldUserLatLng.lng
    )
      return;
    Object.assign(this.oldUserLatLng, newUserLatLng);
    this.userMarker.setPosition(newUserLatLng);
  }

  private initMap(newUserLatLng: { lat: number; lng: number }) {
    const mapOptions = {
      center: newUserLatLng,
      zoom: 16,
      styles: [
        // 自定義地圖樣式
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    };
    const latLng = new google.maps.LatLng(newUserLatLng.lat, newUserLatLng.lng);
    this.map = new google.maps.Map(this.mapDiv.nativeElement, mapOptions);
    this.placesService = new google.maps.places.PlacesService(this.map);
    Object.assign(this.oldUserLatLng, newUserLatLng);
    // 移動地圖中心到定位位置
    this.map.panTo(latLng);
    // 創建標記並將其移動到定位位置
    this.userMarker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Current Location',
      icon: {
        url: 'https://cdn-icons-png.flaticon.com/512/1365/1365700.png',
        scaledSize: new google.maps.Size(80, 80),
      },
    });

    // this.markers.forEach(markerData => {
    //   const marker = new google.maps.Marker({
    //     position: markerData.position,
    //     title: markerData.title,
    //     map: this.map
    //   });

    //   const infoWindow = new google.maps.InfoWindow({
    //     content: `<h3>${markerData.title}</h3><p>${markerData.description}</p>`
    //   });

    //   marker.addListener('click', () => {
    //     infoWindow.open(this.map, marker);
    //   });
    // });

    // 處理地圖點擊事件
    // this.map.addListener('click', (event:any) => {
    // });

    // 路線規劃
    // const directionsService = new google.maps.DirectionsService();
    // const directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });

    // function calculateRoute(origin:any, destination:any) {
    //   const request = {
    //     origin: origin,
    //     destination: destination,
    //     travelMode: 'WALKING'
    //   };

    //   directionsService.route(request, (result:any, status:any) => {
    //     if (status === 'OK') {
    //       directionsRenderer.setDirections(result);
    //     } else {
    //       console.error('Directions error', status);
    //     }
    //   });
    // }

    // directionsRenderer.setMap(this.map);

    // // 處理路線規劃完成事件
    // directionsRenderer.addListener('directions_changed', () => {
    // });
  }

  // 執行地點搜索
  private searchNearbyPlaces() {
    // 使用Google Maps Places API等進行地點搜索
    const request: google.maps.places.PlaceSearchRequest = {
      location: this.map.getCenter(),
      // radius: 5000, // Search within a 5000-meter radius
      type: 'convenience_store', // Search for convenience_store
      openNow: true, // Only show places that are currently open
      rankBy: google.maps.places.RankBy.DISTANCE, // Specifies the ranking method to use when returning results. Note that when rankBy is set to DISTANCE, you must specify a location but you cannot specify a radius or bounds.
    };

    this.placesService.nearbySearch(
      request,
      (results: google.maps.places.PlaceResult[], status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // const geoLocations =  results.map((result:any) => {
          //   const { lat, lng } = result.geometry.location
          //   return { latitude: lat(), longitude: lng() }
          // }).sort(() => Math.random() - 0.5)
          console.log('results');
          console.log(results);
          const origin = new google.maps.LatLng(
            this.oldUserLatLng.lat,
            this.oldUserLatLng.lng
          );
          const destination = new google.maps.LatLng(
            results[0].geometry?.location?.lat(),
            results[0].geometry?.location?.lng()
          );
          this.displaySearchResults(results);
          this.calculateRoute(origin, destination);
        }
      }
    );
  }

  private displaySearchResults(results: google.maps.places.PlaceResult[]) {
    for (const place of results) {
      if (place.photos) place.photos[0].width = 130;
      const marker = new google.maps.Marker({
        position: place.geometry?.location,
        map: this.map,
        title: place.name,
      });

      // 在點擊標記時顯示信息窗口
      marker.addListener('click', () => {
        const infoWindow = new google.maps.InfoWindow({
          content: place.name,
        });
        infoWindow.open(this.map, marker);
        // this.calculateRoute(
        //   new google.maps.LatLng()
        // )
      });
    }
  }

  private calculateRoute(
    origin: google.maps.LatLng,
    destination: google.maps.LatLng
  ) {
    const request = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.WALKING,
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        console.log('directionsService result');
        console.log(result);
        this.directionsRenderer.setMap(this.map);
        this.directionsRenderer.setDirections(result);
      } else {
        console.error('Directions error', status);
      }
    });
  }
}
